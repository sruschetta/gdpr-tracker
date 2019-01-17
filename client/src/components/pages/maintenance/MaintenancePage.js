import React, {Component} from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Fab from '@material-ui/core/Fab';

import Icon from '@material-ui/core/Icon'
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import { SAVE, CANCEL, EDIT, DELETE, MAINTENANCE_TYPES} from "../../../common/Strings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMaintenanceTypes, addMaintenanceType, deleteMaintenanceType, updateMaintenanceType, setPageTitle } from "../../../actions/authActions";


const styles = {
  grow: {
    flexGrow: 1,
  },
  list: {
    backgroundColor: 'white',
    paddingTop: 70,
    marginBottom: 88,
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
};


class MaintenancePage extends Component {

  constructor(){
    super();

    this.state = {
      addDialogOpen: false,
      errors: null,
      anchorEl: null,
      currentItemTitle: '',
      currentItemId: '',
      openDialog: false,
    };
  }

  componentDidMount() {
    //Fetch on load
    this.props.setPageTitle(MAINTENANCE_TYPES);
    this.props.getMaintenanceTypes();
  }

  componentWillReceiveProps(nextProps) {

    //Listen for errors
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors,
      })
    }

    //Listen for reloads
    if(nextProps.auth.reload && nextProps.auth.reload === true) {
      this.setState({
        addDialogOpen: false,
        newItemTitle: ''
      });
      this.props.getMaintenanceTypes();
    }
  }

  render() {

    const { classes, auth, errors } = this.props;
    const items = (auth.maintenance_types)?auth.maintenance_types:[];

    return(
      <div>
        <List className={classes.list}>
          {
            items.map( (item, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText className={classes.grow}>{item.title}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={ (event) => this.menuOpen(event, item) }><Icon>more_vert</Icon></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                )}
              )
            }
        </List>
        <Menu anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.menuClose}>
            <MenuItem onClick={this.updateAction}>{EDIT}</MenuItem>
            <MenuItem color='error' onClick={this.deleteAction}>{DELETE}</MenuItem>
        </Menu>
        <Fab color="primary" className={this.props.classes.fab} onClick={this.addAction}>
          <AddIcon/>
        </Fab>
        <Dialog open={this.state.openDialog}
                fullwidth={'true'}
                maxWidth={'sm'}>
          <DialogTitle>Nuova tipologia intervento</DialogTitle>
          <DialogContent>
            <TextField
              margin='normal'
              fullWidth
              value={this.state.currentItemTitle}
              label='Titolo'
              error={Boolean(errors.title)}
              helperText={errors.title}
              onChange={this.handleChange}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveAction} color="primary">
              {SAVE}
            </Button>
            <Button onClick={this.cancelAction}>
              {CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  /*--- Actions ---*/

  addAction = () => {
    this.setState(
      {
        openDialog: true,
        currentItemTitle: '',
        currentItemId: null,
      }
    );
  }

  deleteAction = () => {
    this.setState({
      anchorEl: null,
    });

    this.props.deleteMaintenanceType(this.state.currentItemId);
  }

  updateAction = item => {
    this.setState({
      anchorEl: null,
      openDialog: true,
    });
  }

  saveAction = () => {

    if(this.state.currentItemId) {
      var maintenanceType = {
        title: this.state.currentItemTitle,
        _id: this.state.currentItemId
      };

      this.props.updateMaintenanceType(maintenanceType);
    }
    else {
      this.props.addMaintenanceType(this.state.currentItemTitle);
    }

    this.cancelAction();
  }

  cancelAction = () => {
    this.setState(
      {
        currentItem: null,
        openDialog:false,
        currentItemTitle: '',
        currentItemId: null,
      }
    );
  }

  /*--- Menu ---*/

  menuOpen = (event, item) => {
    this.setState(
       {
         anchorEl: event.currentTarget,
         currentItemTitle: item.title,
         currentItemId: item._id,
       }
     );
  }

  menuClose = () => {
    this.setState(
       {
         anchorEl: null,
       }
     );
  }


  /*--- Text Field Handler ---*/

  handleChange =  event => {
    var value = event.target.value;

    this.setState({
      currentItemTitle: value,
      }
    );
  }

}


MaintenancePage.propTypes = {
  getMaintenanceTypes: PropTypes.func.isRequired,
  addMaintenanceType: PropTypes.func.isRequired,
  deleteMaintenanceType: PropTypes.func.isRequired,
  updateMaintenanceType: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, {setPageTitle, addMaintenanceType, getMaintenanceTypes, deleteMaintenanceType, updateMaintenanceType })(MaintenancePage));
