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

import { SAVE, CANCEL, EDIT, DELETE, NEW_ZONE, ZONES} from "../../../common/Strings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getZones, addZone, deleteZone, updateZone, setPageTitle } from "../../../actions/authActions";


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


class ZonePage extends Component {

  constructor(){
    super();

    this.state = {
      addDialogOpen: false,
      errors: null,
      anchorEl: null,
      currentItemName: '',
      currentItemId: '',
      openDialog: false,
    };
  }

  componentDidMount() {
    this.props.setPageTitle(ZONES);
    this.props.getZones();
  }

  componentWillReceiveProps(nextProps) {

    //Listen for errors
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors,
      });
    }

    //Listen for reloads
    if(nextProps.auth.reload && nextProps.auth.reload === true) {
      this.setState({
        addDialogOpen: false,
        newItemName: '',
        errors: null,
      });
      this.props.getZones();
      this.cancelAction();
    }
  }

  render() {

    const { classes, auth } = this.props;
    const items = (auth.zones)?auth.zones:[];

    return(
      <div>
        <List className={classes.list}>
          {
            items.map( (item, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText className={classes.grow}>{item.name}</ListItemText>
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
          <DialogTitle>{NEW_ZONE}</DialogTitle>
          <DialogContent>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              value={this.state.currentItemName}
              label='Nome zona'
              error={Boolean(this.state.errors && this.state.errors.name)}
              helperText={(this.state.errors)?this.state.errors.name:''}
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
        currentItemName: '',
        currentItemId: null,
      }
    );
  }

  deleteAction = () => {
    this.setState({
      anchorEl: null,
    });

    this.props.deleteZone(this.state.currentItemId);
  }

  updateAction = item => {
    this.setState({
      anchorEl: null,
      openDialog: true,
    });
  }

  saveAction = () => {

    if(this.state.currentItemId) {
      var zone = {
        name: this.state.currentItemName,
        _id: this.state.currentItemId
      };

      this.props.updateZone(zone);
    }
    else {
      this.props.addZone(this.state.currentItemName);
    }
  }

  cancelAction = () => {
    this.setState(
      {
        currentItem: null,
        openDialog:false,
        currentItemName: '',
        currentItemId: null,
        errors: null
      }
    );
  }

  /*--- Menu ---*/

  menuOpen = (event, item) => {
    this.setState(
       {
         anchorEl: event.currentTarget,
         currentItemName: item.name,
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
      currentItemName: value,
      }
    );
  }
}

ZonePage.propTypes = {
  getZones: PropTypes.func.isRequired,
  addZone: PropTypes.func.isRequired,
  deleteZone: PropTypes.func.isRequired,
  updateZone: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, { setPageTitle, getZones, addZone, deleteZone, updateZone })(ZonePage));
