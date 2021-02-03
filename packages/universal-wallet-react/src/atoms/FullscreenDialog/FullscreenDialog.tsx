import React, { FC, HTMLAttributes, ReactChild } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition: any = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
} as any);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  dialogContent: ReactChild;
  dialogTitle: string;
  dialogSubmitTitle: string;
  dialogTrigger: ReactChild;
  handleCancel: any;
  handleSubmit: any;
}

export const FullscreenDialog: FC<Props> = ({
  dialogContent,
  dialogTitle,
  dialogSubmitTitle,
  dialogTrigger,
  handleCancel,
  handleSubmit,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCancel();
  };

  const _handleSubmit = () => {
    handleClose();
    handleSubmit();
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>{dialogTrigger}</div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialogTitle}
            </Typography>
            <Button autoFocus color="inherit" onClick={_handleSubmit}>
              {dialogSubmitTitle}
            </Button>
          </Toolbar>
        </AppBar>
        {dialogContent}
      </Dialog>
    </React.Fragment>
  );
};
