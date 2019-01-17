import React, {Component} from 'react';

import ListComponent from '../../list/listcore/ListComponent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateDialog from '../../createdialog/CreateDialog';
import EditDialog from '../../editdialog/EditDialog';
import DeleteDialog from '../../deletedialog/DeleteDialog';

import { withStyles } from '@material-ui/core/styles';

import { REF_CODE, BUILDING_NAME, ADDRESS, CITY, EXTRA, REFERENCE, REFERENCE_PHONE, ZONE,
         CREATION_DATE, GDPR_REFERENCE, GDPR_REFERENCE_EMAIL, GDPR_REFERENCE_TYPE,
         GDPR_SECONDARY_REFERENCE, GDPR_SECONDARY_REFERENCE_EMAIL, GDPR_SECONDARY_REFERENCE_TYPE,
         CREATOR, SEND_DATE, MAINTENANCE_TYPE, HELLO
} from "../../../common/Strings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDocument, logoutUser, getDocuments, deleteDocument, updateDocument, sendDocumentEmail,
         getMaintenanceTypes, getClientTypes, getZones, getUsers, setPageTitle, searchDocument } from "../../../actions/authActions";


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
  container: {
  },
  fab: {
      position: 'fixed',
      bottom: 16,
      right: 16,
    },
  searchBar: {
      padding: 16,
  }
};

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editDialogTarget: null,
      deleteDialogTarget: null,
      anchorEl: null,
      errors: {},
    };

    this.items_header = [
      {title: MAINTENANCE_TYPE, class: 'mth'},
      {title: CREATOR, class: 'mth'},
      {title: REF_CODE, class: 'mth'},
      {title: BUILDING_NAME, class: 'mth'},
      {title: ADDRESS, class: 'lth'},
      {title: CITY, class: 'mth'},
      {title: EXTRA, class: 'lth'},
      {title: REFERENCE, class: 'mth'},
      {title: REFERENCE_PHONE, class: 'mth'},
      {title: ZONE, class: 'mth'},
      {title: CREATION_DATE, class: 'mth'},
      {title: GDPR_REFERENCE, class: 'mth'},
      {title: GDPR_REFERENCE_EMAIL, class: 'mth'},
      {title: GDPR_REFERENCE_TYPE, class: 'mth'},
      {title: GDPR_SECONDARY_REFERENCE, class: 'mth'},
      {title: GDPR_SECONDARY_REFERENCE_EMAIL, class: 'mth'},
      {title: GDPR_SECONDARY_REFERENCE_TYPE, class: 'mth'},
      {title: SEND_DATE, class: 'mth'},
      {title: '', class: 'mth'},
    ];
  };

  componentDidMount() {
    this.props.setPageTitle(HELLO + ' ' + this.props.auth.user.name );
    this.getDocumentsAction(0);
    this.props.getMaintenanceTypes();
    this.props.getZones();
    this.props.getClientTypes();
    this.props.getUsers();
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
        createDialogOpen: false
      });

      this.props.getDocuments();
    }
  }


  render() {

      const { auth, classes} = this.props;
      var items = [];
      var count = 0;
      if(auth.s_documents) {
        items = auth.s_documents;
        count = auth.s_count;
      }
      else if(auth.documents) {
        items = auth.documents;
        count = auth.count;
      }


      return(
        <div className={classes.container}>
          <ListComponent items={items}
                         headers={this.items_header}
                         itemEditCallback={this.listItemEditCallback}
                         itemDeleteCallback={this.listItemDeleteCallback}
                         itemSendCallback={this.listItemSendCallback}
                         checkCallback={this.checkCallback}
                         maintenance_types={auth.maintenance_types}
                         zones={auth.zones}
                         client_types={auth.client_types}
                         users={auth.users}
                         currentUserId={auth.user.id}
                         itemsCount={count}
                         pageChangeCallback={this.pageChangeCallback}/>
          <Fab color="primary" className={classes.fab} onClick={this.newItemAction}>
            <AddIcon/>
          </Fab>
          <DeleteDialog target={this.state.deleteDialogTarget}
                        deleteCallback={this.deleteDialogCallback}
                        closeCallback={this.deleteDialogCloseCallback} />
          <CreateDialog open={this.state.createDialogOpen}
                        createCallback={this.createDialogCallback}
                        closeCallback={this.createDialogCloseCallback}
                        errors={this.state.errors}
                        maintenance_types={auth.maintenance_types}
                        zones={auth.zones}
                        client_types={auth.client_types}/>
          <EditDialog target={this.state.editDialogTarget}
                      editCallback={this.editDialogCallback}
                      closeCallback={this.editDialogCloseCallback}
                      errors={this.state.errors}
                      maintenance_types={auth.maintenance_types}
                      zones={auth.zones}
                      client_types={auth.client_types} />
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

  listItemSendCallback = (item) => {
    this.props.sendDocumentEmail(item);
  }

  /*--- Edit Dialog Callbacks ---*/

  editDialogCallback = (item) => {
    console.log(item);
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
  }

  createDialogCloseCallback = () => {
    this.setState({ createDialogOpen: false });
  }

  checkCallback = (item) => {
    item.submitted = !item.submitted;
    this.props.updateDocument(item);
  }

  /*--- Actions ---*/

  logoutAction = () => {
    this.props.logoutUser();
  }

  getDocumentsAction = (page) => {
    this.props.getDocuments(page);
  }

  /*--- Menu ---*/

  menuClick = event => {
    this.setState( {anchorEl: event.currentTarget} );
  }

  menuClose = () => {
    this.setState( {anchorEl: null} );
  }

  pageChangeCallback = (page) => {
    this.getDocumentsAction(page);
  }

}

HomePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  sendDocumentEmail: PropTypes.func.isRequired,
  getMaintenanceTypes: PropTypes.func.isRequired,
  getZones: PropTypes.func.isRequired,
  getClientTypes: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  searchDocument: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, { logoutUser, getDocuments, addDocument,
                                                              deleteDocument, updateDocument,
                                                              sendDocumentEmail,
                                                              getMaintenanceTypes, getZones, searchDocument,
                                                              getClientTypes, getUsers, setPageTitle })(HomePage));
