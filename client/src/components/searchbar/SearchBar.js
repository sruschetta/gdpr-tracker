import React, {Component} from 'react';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { SEARCH } from '../../common/Strings';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchDocument, clearDocumentSearch } from "../../actions/authActions";

const styles = {
  searchBar: {
    paddingTop: 12,
  },
  searchContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    position: 'absolute',
    right: 0
  },
};



class SearchBar extends Component {


  constructor(){

  super();
    this.state = {
      searchTerm: '',
    };
  }

  render(){

    var { classes } = this.props;

    return (
      <div className={classes.searchContainer}>
          <TextField className={classes.searchBar}
                   placeholder={SEARCH}
                   value={this.state.searchTerm}
                   onKeyDown={ (e) => this.keyPressedAction(e) }
                   onChange={this.handleChange('searchTerm')}
                   InputProps={{
                        endAdornment: (
                          <InputAdornment variant="filled" position="end">
                            {
                              <IconButton
                                    onClick={ () => this.searchAction() }>
                                <SearchIcon />
                              </IconButton>
                            }
                          </InputAdornment>
                        )
                      }}/>
      </div>
    );
  }

  searchAction = () => {
    this.props.searchDocument(this.state.searchTerm);
  }

  keyPressedAction = e => {
     if(e.keyCode === 13){
       this.searchAction();
     }
  }

  handleChange = key => event => {

    var value = event.target.value;

    this.setState({
      [key]: value,
    });

    if(value.length === 0){
      this.props.clearDocumentSearch();
    }
  };
}

SearchBar.propTypes = {
  searchDocument: PropTypes.func.isRequired,
  clearDocumentSearch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});


export default withStyles(styles)(connect( mapStateToProps, { searchDocument, clearDocumentSearch })(SearchBar));
