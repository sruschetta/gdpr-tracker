import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from './components/pages/home/HomePage';
import LoginPage from './components/pages/login/LoginPage';
import RegisterPage from './components/pages/register/RegisterPage';
import PrivateRoute from "./components/private-route/PrivateRoute";

import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#1976d2',
      textColor: '#ffffff'
    },
    secondary: {
      main: '#2196f3'
    },
    error: {
      main: '#ff0000'
    },
    background: {
      paper: '#fff',
      default: "#ff0000"
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
  },
});


if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {

    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

class App extends Component {
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
