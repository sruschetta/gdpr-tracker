import React, {Component} from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SEARCH, CREATOR, ZONE, MAINTENANCE_TYPES } from '../../../common/Strings';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  container: {
    padding: '6px 16px',
    textAlign: 'right',
  },
  textfield: {
    top: 12,
    marginRight: 8,
  },
  checkbox: {
    padding: 6
  },
  filter: {
    width: 250
  },
  wrapper: {
  }
}

class SearchToolbar extends Component {

  constructor(){
    super();
    this.state = {
      viewColumnAnchor: null,
      filterAnchor: null,
      searchTerm: '',
    }
  }

  render(){

    const { headers, classes, users, zones, maintenance_types } = this.props;

    return(
      <div className={classes.container}>
        <div className={classes.wrapper}>
        <TextField placeholder={SEARCH}
                  className= {classes.textfield}
                 value={this.state.searchTerm}
                 onKeyDown={ (e) => this.keyPressedAction(e) }
                 onChange={this.handleSearchChange()}
                 InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        {
                          <IconButton
                                disableRipple={true}
                                onClick={ () => this.searchAction() }>
                            <SearchIcon />
                          </IconButton>
                        }
                      </InputAdornment>
                    )
                  }}/>
          <IconButton onClick={this.openFilter}>
            <FilterListIcon />
          </IconButton>
          <IconButton onClick={this.openViewColumns}>
            <ViewColumnIcon />
          </IconButton>
         <Menu
              anchorEl={this.state.filterAnchor}
              open={Boolean(this.state.filterAnchor)}
              onClose={this.handleFilterClose} >
              <List className={classes.filter}>
                <ListItem>
                  <TextField
                    fullWidth
                    label={CREATOR}
                    select
                    value={this.props.filters.userFilter}
                    onChange={this.props.filterChangeCallback('userFilter')} >
                    <MenuItem key={0} value=''></MenuItem>
                    {
                    (users) &&
                        users.map( (user, index) => {
                          return(
                            <MenuItem key={index + 1} value={user._id}>{user.name + " " + user.surname}</MenuItem>
                          )
                        })
                    }
                  </TextField>
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ZONE}
                    select
                    value={this.props.filters.zoneFilter}
                    onChange={this.props.filterChangeCallback('zoneFilter')} >
                      <MenuItem key={0} value=''></MenuItem>
                      {
                      (zones) &&
                          zones.map( (zone, index) => {
                            return(
                              <MenuItem key={index + 1} value={zone._id}>{zone.name}</MenuItem>
                            )
                          })
                      }
                  </TextField>
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    label={MAINTENANCE_TYPES}
                    select
                    value={this.props.filters.maintenanceTypeFilter}
                    onChange={this.props.filterChangeCallback('maintenanceTypeFilter')} >
                      <MenuItem key={0} value=''></MenuItem>
                      {
                      (maintenance_types) &&
                          maintenance_types.map( (type, index) => {
                            return(
                              <MenuItem key={index + 1} value={type._id}>{type.title}</MenuItem>
                            )
                          })
                      }
                  </TextField>
                </ListItem>
              </List>
            </Menu>
          <Menu
            anchorEl={this.state.viewColumnAnchor}
            open={Boolean(this.state.viewColumnAnchor)}
            onClose={this.handleViewColumnClose} >
            <List>
            {
              headers.map( (item, index) => {
                return(
                  <ListItem key={index} dense>
                    <Checkbox className={classes.checkbox} checked={item.checked} onChange={this.handleCheck(index)}/>
                    <ListItemText primary={item.title} />
                  </ListItem>
                );
              })
            }
            </List>
            </Menu>
          </div>
        </div>
    );
  }

  /*--- Columns ---*/

  openViewColumns = event => {
    this.setState({
      viewColumnAnchor: event.currentTarget,
    });
  }

  handleViewColumnClose = () => {
    this.setState({
      viewColumnAnchor: null,
    });
  }

  handleCheck = index => event => {
    this.props.checkColumnCallback(index);
  }

  /*--- Filter ---*/

  openFilter = event => {
    this.setState({
      filterAnchor: event.currentTarget,
    });
  }

  handleFilterClose = () => {
    this.setState({
      filterAnchor: null,
    });
  }

  /*--- Search ---*/

  searchAction = () => {
    this.props.searchCallback(this.state.searchTerm);
  }

  keyPressedAction = e => {
     if(e.keyCode === 13){
       this.searchAction();
     }
  }

  handleSearchChange = key => event => {

    var value = event.target.value;

    this.setState({
      searchTerm: value,
    });

    if(value.length === 0){
      this.props.clearSearchCallback();
    }
  };

}

export default withStyles(styles)(SearchToolbar);
