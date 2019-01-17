import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Root from './components/root/Root';

import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#00e676',
      light: '#33eb91',
      dark: '#00a152',
      contrastText: '#000000'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#ffffff'
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
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

    window.location.href = './login';
  }
}

class App extends Component {
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Root/>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
