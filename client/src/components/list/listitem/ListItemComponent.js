import React, {Component} from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ListItemComponent extends Component {

  state = {
    anchorEl: null,
    checked: false
  };

  render() {

    var creation_date = "";
    if(this.props.item.creation_date) {
      var d = new Date(this.props.item.creation_date);
      if(d) {
        creation_date = [('0' + d.getDate()).slice(-2),
                         ('0' + (d.getMonth() + 1)).slice(-2),
                         d.getFullYear() ].join('/');
      }
    }


    var send_date = "";

    if(this.props.item.send_date) {
      d = new Date(this.props.item.send_date);
      if(d){
        send_date =  [('0' + d.getDate()).slice(-2),
                         ('0' + (d.getMonth() + 1)).slice(-2),
                         d.getFullYear() ].join('/');

        send_date += " " + [('0' + d.getHours()).slice(-2),
                            ('0' + (d.getMinutes() + 1)).slice(-2),
                           ].join(':');
      }
    }

    var maintenance_type = this.getItem(this.props.maintenance_types, this.props.item.maintenance_type);
    var creator = this.getItem(this.props.users, this.props.item.creator);
    var zone = this.getItem(this.props.zones, this.props.item.zone);
    var main_type = this.getItem(this.props.client_types, this.props.item.gdpr_main_reference_type);
    var secondary_type = this.getItem(this.props.client_types, this.props.item.gdpr_secondary_reference_type);

    return (
      <TableRow
        className={this.props.className}
        hover>
        <TableCell>{(maintenance_type)?maintenance_type.title : ''}</TableCell>
        <TableCell>{(creator)?(creator.name + " " + creator.surname) : ''}</TableCell>
        <TableCell>{this.props.item.ref_code}</TableCell>
        <TableCell>{this.props.item.building_name}</TableCell>
        <TableCell>{this.props.item.address}</TableCell>
        <TableCell>{this.props.item.city}</TableCell>
        <TableCell>{this.props.item.extra}</TableCell>
        <TableCell>{this.props.item.reference}</TableCell>
        <TableCell>{this.props.item.reference_phone}</TableCell>
        <TableCell>{(zone)?zone.name:''}</TableCell>
        <TableCell>{creation_date}</TableCell>
        <TableCell>{this.props.item.gdpr_main_reference}</TableCell>
        <TableCell>{this.props.item.gdpr_main_reference_email}</TableCell>
        <TableCell>{(main_type)?main_type.name:''}</TableCell>
        <TableCell>{this.props.item.gdpr_secondary_reference}</TableCell>
        <TableCell>{this.props.item.gdpr_secondary_reference_email}</TableCell>
        <TableCell>{(secondary_type)?secondary_type.name:''}</TableCell>
        <TableCell>{send_date}</TableCell>
        <TableCell>
          <IconButton onClick={this.menuClick}><Icon>more_vert</Icon></IconButton>
          <Menu anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.menuClose}>
            <MenuItem onClick={this.itemEditClick}>Modifica</MenuItem>
            <MenuItem onClick={this.itemDeleteClick}>Elimina</MenuItem>
            <MenuItem onClick={this.itemSendClick}>Invia email GDPR</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }

  handleChange = name => event => {
   this.setState({ [name]: event.target.checked });
 };

  /*--- Menu ---*/

  menuClick = event => {
    this.setState( {anchorEl: event.currentTarget} );
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

  itemSendClick = () => {
    this.menuClose();
    this.props.sendCallback(this.props.item);
  }

  /*--- Find ---*/

  getItem = (array, _id) => {
    if(array && _id) {
      var res = array.find((obj) => (obj._id === _id));
      return (res);
    }
  }

}

export default ListItemComponent;
