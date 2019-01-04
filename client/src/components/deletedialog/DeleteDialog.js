import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import {DELETE_DIALOG_TITLE, DELETE_DIALOG_BODY, CANCEL, DELETE} from "../../common/Strings"


class DeleteDialog extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <Dialog open={Boolean(this.props.target)}>
        <DialogTitle color="primary">{DELETE_DIALOG_TITLE}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {DELETE_DIALOG_BODY}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.deleteCallback} color="primary">
            {DELETE}
          </Button>
          <Button onClick={this.props.closeCallback}>
            {CANCEL}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

export default DeleteDialog;
