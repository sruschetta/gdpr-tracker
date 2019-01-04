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
  GDPR_REFERENCE_EMAIL, GDPR_SECONDARY_REFERENCE, GDPR_SECONDARY_REFERENCE_EMAIL
} from "../../common/Strings";


class EditDialog extends Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.target) {
      const {target} = nextProps;

      this.setState({
        _id: target._id,
        ref_code: target.ref_code,
        building_name: target.building_name,
        address: target.address,
        extra: target.extra,
        reference: target.reference,
        reference_phone: target.reference_phone,
        zone: target.zone,
        gdpr_main_reference: target.gdpr_main_reference,
        gdpr_main_reference_email: target.gdpr_main_reference_email,
        gdpr_secondary_reference: target.gdpr_secondary_reference,
        gdpr_secondary_reference_email: target.gdpr_secondary_reference_email,
      });
    }
  }


  render() {

    if(this.props.target) {

      const {target, errors} = this.props;

      return (
        <Dialog open={Boolean(target)}
                fullwidth={'true'}
                maxWidth={'sm'}>
          <DialogTitle>{EDIT_DIALOG_TITLE}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {EDIT_DIALOG_BODY}
            </DialogContentText>
            <TextField
              margin='normal'
              fullWidth
              label={REF_CODE}
              defaultValue={target.ref_code}
              onChange={this.handleChange('ref_code')}
              error={Boolean(errors.ref_code)}
              helperText={errors.ref_code}/>
            <TextField
              margin='normal'
              fullWidth
              label={BUILDING_NAME}
              defaultValue={target.building_name}
              onChange={this.handleChange('building_name')}
              error={Boolean(errors.building_name)}
              helperText={errors.building_name}/>
            <TextField
              margin='normal'
              fullWidth
              label={ADDRESS}
              multiline
              rows='2'
              defaultValue={target.address}
              onChange={this.handleChange('address')}
              error={Boolean(errors.address)}
              helperText={errors.address}/>
            <TextField
              margin='normal'
              fullWidth
              multiline
              rows='2'
              label={EXTRA}
              defaultValue={target.extra}
              onChange={this.handleChange('extra')} />
            <TextField
              margin='normal'
              fullWidth
              label={REFERENCE}
              defaultValue={target.reference}
              onChange={this.handleChange('reference')}
              error={Boolean(errors.reference)}
              helperText={errors.reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={REFERENCE_PHONE}
              defaultValue={target.reference_phone}
              onChange={this.handleChange('reference_phone')}
              error={Boolean(errors.reference_phone)}
              helperText={errors.reference_phone}/>
            <TextField
              margin='normal'
              fullWidth
              label={ZONE}
              defaultValue={target.zone}
              onChange={this.handleChange('zone')} />
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_REFERENCE}
              defaultValue={target.gdpr_main_reference}
              onChange={this.handleChange('gdpr_main_reference')}
              error={Boolean(errors.gdpr_main_reference)}
              helperText={errors.gdpr_main_reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_REFERENCE_EMAIL}
              defaultValue={target.gdpr_main_reference_email}
              onChange={this.handleChange('gdpr_main_reference_email')}
              error={Boolean(errors.gdpr_main_reference_email)}
              helperText={errors.gdpr_main_reference_email}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_SECONDARY_REFERENCE}
              defaultValue={target.gdpr_secondary_reference}
              onChange={this.handleChange('gdpr_secondary_reference')}
              error={Boolean(errors.gdpr_secondary_reference)}
              helperText={errors.gdpr_secondary_reference}/>
            <TextField
              margin='normal'
              fullWidth
              label={GDPR_SECONDARY_REFERENCE_EMAIL}
              defaultValue={target.gdpr_secondary_reference_email}
              onChange={this.handleChange('gdpr_secondary_reference_email')}
              error={Boolean(errors.gdpr_secondary_reference_email)}
              helperText={errors.gdpr_secondary_reference_email}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveAction} color="primary">
              {EDIT}
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
    this.props.editCallback(this.state);
  }
}


export default EditDialog;
