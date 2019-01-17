import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { EMAIL_SETTINGS, SUBJECT, BODY, SAVE } from "../../../common/Strings";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { setPageTitle, getEmailSettings, updateEmailSettings } from "../../../actions/authActions";

import { withStyles } from '@material-ui/core/styles';


const styles = {
  container: {
    marginTop: 96,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 16,
    maxWidth: 1020,
    width: '90%'
  },
  buttonContainer: {
    paddingTop: 16,
    textAlign: 'center',
  }
};

class EmailPage extends Component {

  componentDidMount() {
    this.props.setPageTitle(EMAIL_SETTINGS);
    this.props.getEmailSettings();
  }

  constructor(){
    super();

    this.state = {
      errors: null,
      subject: '',
      body: '',
    };
  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps);

    //Listen for errors
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors,
      });
    }


    if(nextProps.auth && nextProps.auth.email) {
      this.setState({
        subject: nextProps.auth.email.subject,
        body: nextProps.auth.email.body
      });
    }


    //Listen for reloads
    if(nextProps.auth.reload && nextProps.auth.reload === true) {
      this.setState({
        errors: null,
      });
      this.props.getEmailSettings();
    }
  }

  render() {

    var { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <TextField
          margin='normal'
          fullWidth
          onChange={this.handleChange('subject')}
          value={this.state.subject}
          label={SUBJECT}/>
        <TextField
          margin='normal'
          fullWidth
          rows={5}
          multiline
          onChange={this.handleChange('body')}
          value={this.state.body}
          label={BODY}/>
          <div className={classes.buttonContainer}>
            <Button color='primary' onClick={()=> this.saveAction()}>{SAVE}</Button>
          </div>
      </Paper>
    );
  }

  /*--- Actions ---*/

  saveAction = () => {
    var data = {
      subject: this.state.subject,
      body: this.state.body
    }
    this.props.updateEmailSettings(data);
  }

  /*--- Text Field Handler ---*/

  handleChange =  key => event => {
    var value = event.target.value;

    this.setState({
        [key]: value,
    });
  }
}



EmailPage.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  getEmailSettings: PropTypes.func.isRequired,
  updateEmailSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, { setPageTitle, getEmailSettings, updateEmailSettings })(EmailPage));
