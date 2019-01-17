import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import ListItemComponent from '../listitem/ListItemComponent';

import { withStyles } from '@material-ui/core/styles';

const styles = {

  lth: {
    minWidth: 120,
  },
  mth:{
    minWidth: 80,
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
    maxHeight: 'calc(100vh - 140px)',
    overflowX: 'auto',
  },

  tablePagination: {
    paddingTop: 10,
    paddingRight: 85
  }

};

class ListComponent extends Component {

  constructor(){
    super();
    this.state = {
      rowsPerPage: 50,
      page: 0
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
        <div className ={classes.tableWrapper}>
          <Table padding='dense' className={classes.table}>
            <TableHead color='primary' variant='h4'>
              <TableRow color='primary'>
                {
                  this.props.headers.map( (item, index) => {
                    return (<TableCell color='primary' key={index}
                    className={((item['class'] === 'lth')?classes.lth:classes.mth)}>
                      {item['title']}
                    </TableCell>);
                  })
                }
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
          (this.props.itemsCount > 0) && (
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
