import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

import GDPRItem from '../..//items/GDPRItem';

import {EDIT_DIALOG_TITLE, EDIT_DIALOG_BODY, EDIT, CANCEL, REF_CODE, BUILDING_NAME,
  ADDRESS, EXTRA, REFERENCE, REFERENCE_PHONE, ZONE, CREATION_DATE, GDPR_REFERENCE,
  GDPR_REFERENCE_EMAIL, GDPR_SECONDARY_REFERENCE, GDPR_SECONDARY_REFERENCE_EMAIL, CREATOR,
  SUBMITTED, FIRST_REMINDER, SECOND_REMINDER, THIRD_REMINDER,
  CREATE_DIALOG_TITLE, CREATE_DIALOG_BODY, SAVE
} from "../../common/Strings";


class CreateDialog extends Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    if(this.props.open) {

      const {errors} = this.props;

      return (
        <Dialog open={this.props.open}
                fullwidth={'true'}
                maxWidth={'sm'}>
          <DialogTitle>{CREATE_DIALOG_TITLE}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {CREATE_DIALOG_BODY}
            </DialogContentText>
            <TextField
              margin='normal'
              fullWidth
              label={REF_CODE}
              onChange={this.handleChange('ref_code')}
              error={Boolean(errors.ref_code)}
              helperText={errors.ref_code}/>
            <TextField
              margin='normal'
              fullWidth
              label={BUILDING_NAME}
              onChange={this.handleChange('building_name')}
              error={Boolean(errors.building_name)}
              helperText={errors.building_name}/>
            <TextField
              margin='normal'
              fullWidth
              label={ADDRESS}
              multiline
              rows='2'
              onChange={this.handleChange('address')}
              error={Boolean(errors.address)}
              helperText={errors.address}/>
            <TextField
              margin='normal'
              fullWidth
              multiline
              rows='2'
              label={EXTRA}
              onChange={this.handleChange('extra')} />
            <TextField
              margin='normal'
              fullWidth
              label={REFERENCE}
              onChange={this.handleChange('reference')}
              error={Boolean(errors.reference)}
              helperText={errors.reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={REFERENCE_PHONE}
              onChange={this.handleChange('reference_phone')}
              error={Boolean(errors.reference_phone)}
              helperText={errors.reference_phone}/>
            <TextField
              margin='normal'
              fullWidth
              label={ZONE}
              onChange={this.handleChange('zone')} />
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_REFERENCE}
              onChange={this.handleChange('gdpr_main_reference')}
              error={Boolean(errors.gdpr_main_reference)}
              helperText={errors.gdpr_main_reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_REFERENCE_EMAIL}
              onChange={this.handleChange('gdpr_main_reference_email')}
              error={Boolean(errors.gdpr_main_reference_email)}
              helperText={errors.gdpr_main_reference_email}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_SECONDARY_REFERENCE}
              onChange={this.handleChange('gdpr_secondary_reference')}
              error={Boolean(errors.gdpr_secondary_reference)}
              helperText={errors.gdpr_secondary_reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_SECONDARY_REFERENCE_EMAIL}
              onChange={this.handleChange('gdpr_secondary_reference_email')}
              error={Boolean(errors.gdpr_secondary_reference_email)}
              helperText={errors.gdpr_secondary_reference_email}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveAction} color="primary">
              {SAVE}
            </Button>
            <Button onClick={this.props.closeCallback}>
              {CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    else {
      return null;
    }
  }

  saveAction = () => {
    this.props.createCallback(this.state);
  }
}

export default CreateDialog;
