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
  container: {
    paddingTop: 64,
    paddingBottom: 88,
  },
  table: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor: 'white',
  },
  lth: {
    minWidth: 120,

  },
  mth:{
    minWidth: 80,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'red',
    },
  },
};

class ListComponent extends Component {

  state = {
    rowsPerPage: 10,
    page: 0
  }

  constructor(props){
    super(props);
  }

  render() {

    const { classes, items, headers } = this.props;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    return(
      <div className={classes.container}>
        <Table padding='dense' className={classes.table}>
            <TableHead color='primary' variant='h4'>
              <TableRow color='primary'>
                {
                  this.props.headers.map( (item, index) => {
                    return (<TableCell color='primary' key={index}
                    className={((item['class'] == 'lth')?classes.lth:classes.mth)}>
                      {item['title']}
                    </TableCell>);
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
            {
              items.map( (item, index) => {
                return (
                  <ListItemComponent className={classes.row}
                                     item={item}
                                     key={index}
                                     editCallback={this.props.itemEditCallback}
                                     deleteCallback={this.props.itemDeleteCallback}
                                     checkCallback={this.props.checkCallback}/>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
}

export default withStyles(styles)(ListComponent);
