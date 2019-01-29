import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

import Typography from '@material-ui/core/Typography';

import ListItemComponent from '../listitem/ListItemComponent';
import SearchToolbar from '../toolbar/SearchToolbar';

import { withStyles } from '@material-ui/core/styles';

const styles = {

  lth: {
    minWidth: 160,
  },
  mth:{
    minWidth: 120,
  },
  sth: {
    minWidth: 40,
  },
  row: {
    background: '#f5f5f5',
  },
  root: {
    width: '100%',
    paddingTop: 64,
  },

  table: {
    minWidth: 1020,
    backgroundColor: 'white',
  },

  tableWrapper: {
    maxHeight: 'calc(100vh - 192px)',
    overflowX: 'auto',
  },

  tablePagination: {
    paddingTop: 10,
    paddingRight: 85
  },
  black: {
    color: 'black',
  }

};

class ListComponent extends Component {

  constructor(){
    super();
    this.state = {
      rowsPerPage: 50,
      page: 0,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.count !== this.props.count){
      this.setState({
        page: 0
      });
    }
  }

  render() {

    const { classes, items } = this.props;

    return(
      <div className={classes.root}>
        <SearchToolbar
          checkColumnCallback={this.props.checkColumnCallback}
          searchCallback={this.props.searchCallback}
          clearSearchCallback={this.props.clearSearchCallback}
          headers={this.props.headers}
          users={this.props.users}
          zones={this.props.zones}
          maintenance_types={this.props.maintenance_types}
          filters={this.props.filters}
          filterChangeCallback={this.props.filterChangeCallback}
          />
        <div className ={classes.tableWrapper}>
          <Table padding='dense' className={classes.table}>
            <TableHead color='primary'>
              <TableRow color='primary'>
                {
                  this.props.headers.map( (item, index) => {

                    if(!item.checked) return null;

                    var className = '';
                    switch(item['class']) {
                      case 'lth':
                        className = classes.lth;
                        break;
                      case 'mth':
                        className = classes.mth;
                        break;
                      case 'sth':
                        className =  classes.sth;
                        break;
                      default:
                        break;
                    }

                    return (
                      <TableCell color='primary'
                                 key={index}
                                 className={className}>
                        <TableSortLabel
                          active={this.props.orderBy === index}
                          direction={this.props.order}
                          onClick={ this.props.sortHandler(index) } >
                          <Typography className={classes.black}>
                            <b>{ item['title'] }</b>
                          </Typography>
                        </TableSortLabel>
                      </TableCell>);
                  })
                }
                <TableCell color='primary'
                           key={0}
                           className={'sth'}>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              items.map( (item, index) => {

                var rowClass = (item.creator === this.props.currentUserId)? classes.row : null;

                return (
                  <ListItemComponent className={rowClass}
                                     item={item}
                                     key={index}
                                     maintenance_types={this.props.maintenance_types}
                                     zones={this.props.zones}
                                     client_types={this.props.client_types}
                                     users={this.props.users}
                                     headers={this.props.headers}
                                     editCallback={this.props.itemEditCallback}
                                     deleteCallback={this.props.itemDeleteCallback}
                                     sendCallback={this.props.itemSendCallback}
                                     checkCallback={this.props.checkCallback}/>
                )
              })
            }
          </TableBody>
        </Table>
        </div>
        {
          (this.props.itemsCount > 50) && (
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[this.state.rowsPerPage]}
              component="div"
              count={this.props.itemsCount}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />)
          }
      </div>
    );
  }


  /*--- Page Change ---*/

  handleChangePage = (event, page) => {

    this.setState({
      page: page
    });

    this.props.pageChangeCallback(page);
  };

  handleChangeRowsPerPage = event => {
  };

}

export default withStyles(styles)(ListComponent);
