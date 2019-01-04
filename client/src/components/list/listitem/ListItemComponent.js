import React, {Component} from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ListItemComponent extends Component {

  state = {
    anchorEl: null,
  };

  constructor(props) {
    super(props);
  }

  render() {

    var date = "";
    var d = new Date(this.props.item.creation_date);
    if(d) {
      date = [('0' + d.getDate()).slice(-2),
              ('0' + (d.getMonth() + 1)).slice(-2),
              d.getFullYear() ].join('/');
    }

    return (
      <TableRow className='table_row'>
        <TableCell>{this.props.item.ref_code}</TableCell>
        <TableCell>{this.props.item.building_name}</TableCell>
        <TableCell>{this.props.item.address}</TableCell>
        <TableCell>{this.props.item.extra}</TableCell>
        <TableCell>{this.props.item.reference}</TableCell>
        <TableCell>{this.props.item.reference_phone}</TableCell>
        <TableCell>{this.props.item.zone}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{this.props.item.gdpr_main_reference}</TableCell>
        <TableCell>{this.props.item.gdpr_main_reference_email}</TableCell>
        <TableCell>{this.props.item.gdpr_secondary_reference}</TableCell>
        <TableCell>{this.props.item.gdpr_secondary_reference_email}</TableCell>
        <TableCell>{this.props.item.creator}</TableCell>
        <TableCell>
          <Checkbox onClick={this.checkboxAction()}>{this.props.item.submitted}</Checkbox>
        </TableCell>
        <TableCell>{this.props.item.first_reminder}</TableCell>
        <TableCell>{this.props.item.second_reminder}</TableCell>
        <TableCell>{this.props.item.third_reminder}</TableCell>
        <TableCell>
          <IconButton onClick={this.menuClick}><Icon>more_vert</Icon></IconButton>
          <Menu anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.menuClose}>
            <MenuItem onClick={this.itemEditClick}>Modifica</MenuItem>
            <MenuItem onClick={this.itemDeleteClick} color='error'>Elimina</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }

  checkboxAction = () => {
    console.log('here');
  }

  menuClick = event => {
    this.setState( {anchorEl: event.currentTarget} );
    var date = this.props.item.creation_date;
  }

  menuClose = () => {
    this.setState( {anchorEl: null} );
  }

  itemEditClick = () => {
    this.menuClose();
    this.props.editCallback(this.props.item);
  }

  itemDeleteClick = () => {
    this.menuClose();
    this.props.deleteCallback(this.props.item);
  }
}

export default ListItemComponent;
