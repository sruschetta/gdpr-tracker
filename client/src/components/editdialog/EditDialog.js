import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

import {EDIT_DIALOG_TITLE, EDIT_DIALOG_BODY, EDIT, CANCEL, REF_CODE, BUILDING_NAME,
  ADDRESS, EXTRA, CITY, PROVINCE, REFERENCE, REFERENCE_PHONE, REFERENCE_MOBILE_PHONE, ZONE, GDPR_REFERENCE, GDPR_REFERENCE_EMAIL,
  GDPR_SECONDARY_REFERENCE, GDPR_SECONDARY_REFERENCE_EMAIL, MAINTENANCE_TYPE,
  GDPR_REFERENCE_TYPE, GDPR_SECONDARY_REFERENCE_TYPE
} from "../../common/Strings";


class EditDialog extends Component {

  constructor(){
    super();

    this.state = {
      _id: '',
      ref_code: '',
      building_name: '',
      address: '',
      city: '',
      province: '',
      extra: '',
      reference: '',
      reference_phone: '',
      reference_mobile: '',
      zone: '',
      gdpr_main_reference: '',
      gdpr_main_reference_email: '',
      gdpr_main_reference_type: '',
      gdpr_secondary_reference: '',
      gdpr_secondary_reference_email: '',
      gdpr_secondary_reference_type: '',
      maintenance_type: '',
    }
  }

  handleChange = name => event => {

    var value = event.target.value;
    /*
    if(name === 'reference_phone') {
      value = value.replace(/[^0-9.]/g, '');
      if( value.length > this.state.reference_phone.length ) {
        if(value[0] === '0'){
          if(value.length === 4) {
            value += '.';
          }
        }
        else {
          if(value.length === 3) {
            value += '.';
          }
        }
      }
    }
    */
    this.setState({
      [name]: value,
    });

  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.target) {
      const {target} = nextProps;

      this.setState({
        _id: target._id,
        maintenance_type: target.maintenance_type,
        ref_code: target.ref_code,
        building_name: target.building_name,
        address: target.address,
        city: target.city,
        province: target.province,
        extra: target.extra,
        reference: target.reference,
        reference_phone: target.reference_phone,
        reference_mobile: target.reference_mobile,
        zone: target.zone,
        gdpr_main_reference: target.gdpr_main_reference,
        gdpr_main_reference_email: target.gdpr_main_reference_email,
        gdpr_main_reference_type: target.gdpr_main_reference_type,
        gdpr_secondary_reference: target.gdpr_secondary_reference,
        gdpr_secondary_reference_email: target.gdpr_secondary_reference_email,
        gdpr_secondary_reference_type: target.gdpr_secondary_reference_type,
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
              select
              margin='normal'
              fullWidth
              onChange={this.handleChange('maintenance_type')}
              value={this.state.maintenance_type}
              label={MAINTENANCE_TYPE + '*'}>
                {(this.props.maintenance_types) && this.props.maintenance_types.map( (item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={REF_CODE}
              onChange={this.handleChange('ref_code')}
              value={this.state.ref_code}
              error={Boolean(errors.ref_code)}
              helperText={errors.ref_code}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={BUILDING_NAME}
              onChange={this.handleChange('building_name')}
              value={this.state.building_name}
              error={Boolean(errors.building_name)}
              helperText={errors.building_name}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={ADDRESS  + '*'}
              multiline
              rows='2'
              onChange={this.handleChange('address')}
              value={this.state.address}
              error={Boolean(errors.address)}
              helperText={errors.address}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={CITY  + '*'}
              onChange={this.handleChange('city')}
              value={this.state.city}
              error={Boolean(errors.city)}
              helperText={errors.city}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={PROVINCE  + '*'}
              onChange={this.handleChange('province')}
              value={this.state.province}
              error={Boolean(errors.province)}
              helperText={errors.province}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              multiline
              rows='2'
              label={EXTRA}
              onChange={this.handleChange('extra')}
              value={this.state.extra}
              />
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={REFERENCE  + '*'}
              onChange={this.handleChange('reference')}
              error={Boolean(errors.reference)}
              value={this.state.reference}
              helperText={errors.reference}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={REFERENCE_PHONE}
              onChange={this.handleChange('reference_phone')}
              error={Boolean(errors.reference_phone)}
              value={this.state.reference_phone}
              helperText={errors.reference_phone}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={REFERENCE_MOBILE_PHONE}
              onChange={this.handleChange('reference_mobile')}
              error={Boolean(errors.reference_mobile)}
              value={this.state.reference_mobile}
              helperText={errors.reference_mobile}/>
            <TextField
              select
              margin='normal'
              fullWidth
              label={ZONE}
              onChange={this.handleChange('zone')}
              error={Boolean(errors.zone)}
              helperText={errors.zone}
              value={this.state.zone} >
              {(this.props.zones) && this.props.zones.map( (item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              margin='normal'
              fullWidth
              label={GDPR_REFERENCE_TYPE}
              onChange={this.handleChange('gdpr_main_reference_type')}
              error={Boolean(errors.gdpr_main_reference_type)}
              helperText={errors.gdpr_main_reference_type}
              value={this.state.gdpr_main_reference_type} >
                <MenuItem key={0} value={''}></MenuItem>
                {
                  (this.props.client_types) && this.props.client_types.map( (item, index) => (
                  <MenuItem key={ index + 1 } value={item._id}>
                    {item.name}
                  </MenuItem>
                  ))
                }
            </TextField>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={GDPR_REFERENCE  + '*'}
              onChange={this.handleChange('gdpr_main_reference')}
              value={this.state.gdpr_main_reference}
              error={Boolean(errors.gdpr_main_reference)}
              helperText={errors.gdpr_main_reference} />
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={GDPR_REFERENCE_EMAIL  + '*'}
              onChange={this.handleChange('gdpr_main_reference_email')}
              error={Boolean(errors.gdpr_main_reference_email)}
              value={this.state.gdpr_main_reference_email}
              helperText={errors.gdpr_main_reference_email} />
            <TextField
              select
              margin='normal'
              fullWidth
              label={GDPR_SECONDARY_REFERENCE_TYPE}
              onChange={this.handleChange('gdpr_secondary_reference_type')}
              error={Boolean(errors.gdpr_secondary_reference_type)}
              helperText={errors.gdpr_secondary_reference_type}
              value={this.state.gdpr_secondary_reference_type} >
                <MenuItem key={0} value={''}></MenuItem>
                {
                  (this.props.client_types) && this.props.client_types.map( (item, index) => (
                  <MenuItem key={ index + 1 } value={item._id}>
                    {item.name}
                  </MenuItem>
                  ))
                }
            </TextField>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={GDPR_SECONDARY_REFERENCE}
              onChange={this.handleChange('gdpr_secondary_reference')}
              value={this.state.gdpr_secondary_reference}
              error={Boolean(errors.gdpr_secondary_reference)}
              helperText={errors.gdpr_secondary_reference}/>
            <TextField
              margin='normal'
              fullWidth
              autoComplete='new-password'
              label={GDPR_SECONDARY_REFERENCE_EMAIL}
              onChange={this.handleChange('gdpr_secondary_reference_email')}
              error={Boolean(errors.gdpr_secondary_reference_email)}
              value={this.state.gdpr_secondary_reference_email}
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
