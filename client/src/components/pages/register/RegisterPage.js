import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

import {REGISTRATION, EMAIL, PASSWORD, PASSWORD2, NAME, SURNAME, REGISTRATION_BODY} from '../../../common/Strings';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';


const styles = {
  card : {
    maxWidth: '640px',
    margin: '32px auto'
  },
  header: {
  },
  actions: {
     justifyContent: 'center'
  }
}

class RegisterPage extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {

    const { errors, classes } = this.props;

    return(
      <Card className={classes.card}>
        <CardHeader title={REGISTRATION} subheader={REGISTRATION_BODY} color={'primary'} className={classes.header}/>
        <CardContent>
          <TextField
            error={errors.email}
            helperText={errors.email}
            margin='normal'
            fullWidth
            label={EMAIL}
            onChange={this.handleChange('email')}
          />
          <TextField
            error={errors.password}
            helperText={errors.password}
            type='password'
            margin='normal'
            fullWidth
            label={PASSWORD}
            onChange={this.handleChange('password')}
          />
          <TextField
            error={errors.password2}
            helperText={errors.password2}
            type='password'
            margin='normal'
            fullWidth
            label={PASSWORD2}
            onChange={this.handleChange('password2')}
          />
          <TextField
            error={errors.name}
            helperText={errors.name}
            margin='normal'
            fullWidth
            label={NAME}
            onChange={this.handleChange('name')}
          />
          <TextField
            error={errors.surname}
            helperText={errors.surname}
            margin='normal'
            fullWidth
            label={SURNAME}
            onChange={this.handleChange('surname')}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={this.registerAction} variant="contained"
                  size='large' color='primary' >
                  {REGISTRATION}
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

  registerAction = () => {

    const newUser = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }
}


RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(connect( mapStateToProps, { registerUser } )(withRouter(RegisterPage)));
