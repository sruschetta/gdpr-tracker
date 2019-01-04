import React, {Component} from 'react';

import ListComponent from '../../list/listcore/ListComponent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateDialog from '../../createdialog/CreateDialog';
import EditDialog from '../../editdialog/EditDialog';
import DeleteDialog from '../../deletedialog/DeleteDialog';

import { withStyles } from '@material-ui/core/styles';

import GDPRItem from '../../../items/GDPRItem';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { REF_CODE, BUILDING_NAME, ADDRESS, EXTRA, REFERENCE, REFERENCE_PHONE, ZONE,
         CREATION_DATE, GDPR_REFERENCE, GDPR_REFERENCE_EMAIL, GDPR_SECONDARY_REFERENCE,
         GDPR_SECONDARY_REFERENCE_EMAIL, CREATOR, SUBMITTED, FIRST_REMINDER, SECOND_REMINDER, THIRD_REMINDER,
         HELLO
} from "../../../common/Strings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDocument, logoutUser, getDocuments, deleteDocument, updateDocument } from "../../../actions/authActions";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  fab: {
      position: 'fixed',
      bottom: 16,
      right: 16,
    },
};

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editDialogTarget: null,
      deleteDialogTarget: null,
      errors: {},
    };

    this.items_header = [
      {title: REF_CODE, class: 'mth'},
      {title: BUILDING_NAME, class: 'mth'},
      {title: ADDRESS, class: 'lth'},
      {title: EXTRA, class: 'lth'},
      {title: REFERENCE, class: 'mth'},
      {title: REFERENCE_PHONE, class: 'mth'},
      {title: ZONE, class: 'mth'},
      {title: CREATION_DATE, class: 'mth'},
      {title: GDPR_REFERENCE, class: 'mth'},
      {title: GDPR_REFERENCE_EMAIL, class: 'mth'},
      {title: GDPR_SECONDARY_REFERENCE, class: 'mth'},
      {title: GDPR_SECONDARY_REFERENCE_EMAIL, class: 'mth'},
      {title: CREATOR, class: 'mth'},
      {title: SUBMITTED, class: 'mth'},
      {title: FIRST_REMINDER, class: 'mth'},
      {title: SECOND_REMINDER, class: 'mth'},
      {title: THIRD_REMINDER, class: 'mth'},
      {title: '', class: 'mth'},
    ];
  };

  componentDidMount() {
    this.getDocumentsAction();
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.profile){
      this.setState({
        profile: nextProps.profile
      });
    }
    else if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }

    if(nextProps.auth.reload && nextProps.auth.reload === true) {
      this.setState({
        editDialogTarget: null,
        deleteDialogTarget: null,
      });

      this.props.getDocuments();
    }
  }


  render() {

      const { classes, auth } = this.props;
      return(
        <div>
          <AppBar position="fixed" >
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              {HELLO + ' ' + auth.user.name}
              </Typography>
              <Button color='inherit' onClick={this.logoutAction} >Logout</Button>
            </Toolbar>
          </AppBar>
          <ListComponent items={(auth.documents)?auth.documents:[]}
                         headers={this.items_header}
                         itemEditCallback={this.listItemEditCallback}
                         itemDeleteCallback={this.listItemDeleteCallback}
                         checkCallback={this.checkCallback}/>
          <Fab color="primary" className={this.props.classes.fab} onClick={this.newItemAction}>
            <AddIcon/>
          </Fab>
          <DeleteDialog target={this.state.deleteDialogTarget}
                        deleteCallback={this.deleteDialogCallback}
                        closeCallback={this.deleteDialogCloseCallback} />
          <CreateDialog open={this.state.createDialogOpen}
                        createCallback={this.createDialogCallback}
                        closeCallback={this.createDialogCloseCallback}
                        errors={this.state.errors} />
          <EditDialog target={this.state.editDialogTarget}
                      editCallback={this.editDialogCallback}
                      closeCallback={this.editDialogCloseCallback}
                      errors={this.state.errors} />
        </div>
    );
  }

  /*--- New Item ---*/

  newItemAction = () => {
    this.setState({createDialogOpen: true});
  }


  /*---- List Item Callbacks ---*/

  listItemDeleteCallback = (item) => {
    this.setState({deleteDialogTarget: item});
  }

  listItemEditCallback = (item) => {
    this.setState({editDialogTarget: item});
  }

  /*--- Edit Dialog Callbacks ---*/

  editDialogCallback = (item) => {
    this.props.updateDocument(item);
    //this.setState({editDialogTarget: null});
  }

  editDialogCloseCallback = () => {
    this.setState({editDialogTarget: null});
  }

  /*--- Delete Dialog Callbacks ---*/

  deleteDialogCallback = () => {
    this.props.deleteDocument(this.state.deleteDialogTarget);
    //this.setState({deleteDialogTarget: null});
  }

  deleteDialogCloseCallback = () => {
    this.setState({deleteDialogTarget: null});
  }


  /*--- Create Dialog Callbacks ---*/

  createDialogCallback = (item) => {
    this.props.addDocument(item);
    //this.setState({ createDialogOpen: false });
  }

  createDialogCloseCallback = () => {
    this.setState({ createDialogOpen: false });
  }

  checkCallback = () => {
    console.log('here');
  }

  /*--- Actions ---*/

  logoutAction = () => {
    this.props.logoutUser();
  }

  getDocumentsAction = () => {
    this.props.getDocuments();
  }
}

HomePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, { logoutUser, getDocuments, addDocument, deleteDocument, updateDocument })(HomePage));
