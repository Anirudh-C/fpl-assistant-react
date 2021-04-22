import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class ErrorDialog extends React.Component {
    render() {
        return (
            <Dialog
              fullWidth
              maxWidth="sm"
              open={this.props.visible}
              onClose={this.props.handleClose}
            >
              <DialogTitle>Error!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {this.props.text}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

export default ErrorDialog;
