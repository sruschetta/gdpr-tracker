import React, {Component} from 'react';

import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import MaintenancePage from '../pages/maintenance/MaintenancePage';
import ZonePage from '../pages/zone/ZonePage';
import ClientPage from '../pages/client/ClientPage';
import EmailPage from '../pages/email/EmailPage';
import PrivateRoute from '../private-route/PrivateRoute';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";


import { HOME, ZONES, MAINTENANCE_TYPES, CLIENT_TYPES, EMAIL_SETTINGS, LOGOUT } from '../../common/Strings';

const styles = {
  list: {
      minWidth:'300px'
    },

    closeContainer: {
      textAlign: 'right',
      paddingTop: '12px',
      paddingRight: '12px',
    },
};



class Root extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false
    }
  }

  render(){

    const { classes, auth } = this.props;

    return (
      <BrowserRouter>
      <div>
      {
        (auth && auth.isAuthenticated && (
          <div>
          <AppBar>
            <Toolbar>
              <IconButton color='inherit' onClick={this.toggleMenu}><MenuIcon/></IconButton>
              <Typography variant="h6" color="inherit">
                {auth.pageTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          </div>
        ))
      }
      <Drawer anchor="left" open={this.state.menuOpen} >
        <div className={classes.closeContainer}>
          <IconButton color='inherit' onClick={() => this.toggleMenu()}><CloseIcon/></IconButton>
        </div>
        <List className={classes.list}>
          <ListItem button component={Link} to='/' onClick={() => this.toggleMenu()}>{HOME}</ListItem>
          <ListItem button component={Link} to='/zone' onClick={() =>this.toggleMenu()}>{ZONES}</ListItem>
          <ListItem button component={Link} to='/maintenance' onClick={() => this.toggleMenu()}>{MAINTENANCE_TYPES}</ListItem>
          <ListItem button component={Link} to='/client' onClick={() => this.toggleMenu()}>{CLIENT_TYPES}</ListItem>
          <ListItem button component={Link} to='/email' onClick={() => this.toggleMenu()}>{EMAIL_SETTINGS}</ListItem>
          <ListItem />
          <ListItem button onClick={ () => this.logoutAction() }>{LOGOUT}</ListItem>
        </List>
      </Drawer>
        <div>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Switch>
            <PrivateRoute exact path='/maintenance' component={MaintenancePage} />
            <PrivateRoute exact path='/zone' component={ZonePage} />
            <PrivateRoute exact path='/client' component={ClientPage} />
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute exact path='/email' component={EmailPage} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }


  /*--- Menu ---*/

  toggleMenu = () => {
    this.setState({menuOpen:!this.state.menuOpen});
  }

  /*--- Actions ---*/

  logoutAction = () => {
    this.props.logoutUser();
    this.toggleMenu();
  }

  menuAction = (target) => {
    this.props.history.push('/zone');
  }
}


Root.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});


export default withStyles(styles)(withRouter(connect( mapStateToProps, { logoutUser })(Root)));
