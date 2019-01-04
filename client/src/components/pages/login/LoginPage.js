import React, {Component} from 'react';

import {LOGIN, EMAIL, PASSWORD, LOGIN_BODY, NEED_AN_ACCOUNT, REGISTRATION} from '../../../common/Strings';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";


const styles = {
  card : {
    maxWidth: '640px',
    margin: '32px auto'
  },
  header: {
  },
  actions: {
     justifyContent: 'center'
  },
  register: {
    padding: '16px 0',
  }
}


class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {

    const { classes, errors } = this.props;

    return(
      <Card className={classes.card}>
        <CardHeader title={LOGIN} subheader={LOGIN_BODY} color={'primary'} className={classes.header} />
        <CardContent>
          <TextField
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin='normal'
            fullWidth
            label={EMAIL}
            onChange={this.handleChange('email')}
          />
          <TextField
            error={Boolean(errors.password) }
            helperText={errors.password}
            margin='normal'
            fullWidth
            type='password'
            label={PASSWORD}
            onChange={this.handleChange('password')}
          />
          <Typography variant='caption' className={classes.register}>
            {NEED_AN_ACCOUNT} <a href='/register'>{REGISTRATION}</a>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={this.loginAction} variant="contained"
                  size='large' color='primary' >
                  {LOGIN}
          </Button>
        </CardActions>
      </Card>
    );
  }

  //Handlers

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  //Actions

  loginAction = () => {

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(connect( mapStateToProps, { loginUser })(LoginPage));
