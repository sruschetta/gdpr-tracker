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

    var maintenanceCell = null;
    var creatorCell = null;
    var refCodeCell = null;
    var buildingCell = null;
    var addressCell = null;
    var cityCell = null;
    var provinceCell = null;
    var extraCell = null;
    var referenceCell = null;
    var referencePhoneCell = null;
    var referenceMobileCell = null;
    var zoneCell = null;
    var creationDateCell = null;
    var mainTypeCell = null;
    var mainReferenceCell = null;
    var mainReferenceEmailCell = null;
    var secondaryTypeCell = null;
    var secondaryReferenceCell = null;
    var secondaryReferenceEmailCell = null;
    var sendCell = null;

    if(this.props.headers){

      if(this.props.headers[0].checked === true) {
        maintenanceCell = <TableCell>{(maintenance_type)?maintenance_type.title : ''}</TableCell>;
      }
      if(this.props.headers[1].checked === true) {
        creatorCell = <TableCell>{(creator)?(creator.name + " " + creator.surname) : ''}</TableCell>;
      }
      if(this.props.headers[2].checked === true) {
        refCodeCell = <TableCell>{this.props.item.ref_code}</TableCell>;
      }
      if(this.props.headers[3].checked === true) {
        buildingCell = <TableCell>{this.props.item.building_name}</TableCell>;
      }
      if(this.props.headers[4].checked === true) {
        addressCell = <TableCell>{this.props.item.address}</TableCell>;
      }
      if(this.props.headers[5].checked === true) {
        cityCell = <TableCell>{this.props.item.city}</TableCell>;
      }
      if(this.props.headers[6].checked === true) {
        provinceCell = <TableCell>{this.props.item.province}</TableCell>;
      }
      if(this.props.headers[7].checked === true) {
        extraCell = <TableCell>{this.props.item.extra}</TableCell>;
      }
      if(this.props.headers[8].checked === true) {
        referenceCell = <TableCell>{this.props.item.reference}</TableCell>;
      }
      if(this.props.headers[9].checked === true) {
        referencePhoneCell = <TableCell>{this.props.item.reference_phone}</TableCell>;
      }
      if(this.props.headers[10].checked === true) {
        referenceMobileCell = <TableCell>{this.props.item.reference_mobile}</TableCell>;
      }
      if(this.props.headers[11].checked === true) {
        zoneCell = <TableCell>{(zone)?zone.name:''}</TableCell>;
      }
      if(this.props.headers[12].checked === true) {
        creationDateCell = <TableCell>{creation_date}</TableCell>;
      }
      if(this.props.headers[13].checked === true) {
        mainTypeCell = <TableCell>{(main_type)?main_type.name:''}</TableCell>;
      }
      if(this.props.headers[14].checked === true) {
        mainReferenceCell = <TableCell>{this.props.item.gdpr_main_reference}</TableCell>;
      }
      if(this.props.headers[15].checked === true) {
        mainReferenceEmailCell = <TableCell>{this.props.item.gdpr_main_reference_email}</TableCell>;
      }
      if(this.props.headers[16].checked === true) {
        secondaryTypeCell = <TableCell>{(secondary_type)?secondary_type.name:''}</TableCell>;
      }
      if(this.props.headers[17].checked === true) {
        secondaryReferenceCell = <TableCell>{this.props.item.gdpr_secondary_reference}</TableCell>;
      }
      if(this.props.headers[18].checked === true) {
        secondaryReferenceEmailCell = <TableCell>{this.props.item.gdpr_secondary_reference_email}</TableCell>;
      }
      if(this.props.headers[19].checked === true) {
        sendCell = <TableCell>{send_date}</TableCell>;
      }
    }
    return (

      <TableRow
        className={this.props.className}
        hover>
        {maintenanceCell}
        {creatorCell}
        {refCodeCell}
        {buildingCell}
        {addressCell}
        {cityCell}
        {provinceCell}
        {extraCell}
        {referenceCell}
        {referencePhoneCell}
        {referenceMobileCell}
        {zoneCell}
        {creationDateCell}
        {mainTypeCell}
        {mainReferenceCell}
        {mainReferenceEmailCell}
        {secondaryTypeCell}
        {secondaryReferenceCell}
        {secondaryReferenceEmailCell}
        {sendCell}
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
