import React, { FC, HTMLAttributes } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArchiveIcon from '@material-ui/icons/Archive';
// import UnarchiveIcon from '@material-ui/icons/Unarchive';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import CreateIcon from '@material-ui/icons/Create';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExploreIcon from '@material-ui/icons/Explore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { red, blue } from '@material-ui/core/colors';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { FullscreenDialog } from '../../atoms/FullscreenDialog';

import { WalletMenu } from '../WalletMenu';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

import { CapturePasswordDialogContent } from '../../atoms/CapturePasswordDialog';

import { ExploreDialogContent } from '../../molecules/dialogs/ExploreDialog';

import { AddDialogContent } from '../../molecules/dialogs/AddDialog';
import { RemoveDialogContent } from '../../molecules/dialogs/RemoveDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  red: {
    backgroundColor: red[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
}));

export interface Props extends HTMLAttributes<HTMLDivElement> {
  wallet: any;
  handleWalletOperation: any;
}

export const UniversalWalletCard: FC<Props> = ({
  wallet,
  handleWalletOperation,
}) => {
  const classes = useStyles();
  const contentAsOptions = wallet.contents.map((content: any) => {
    return {
      value: content.id,
      logo: content.image || 'https://via.placeholder.com/150',
      label: content.name || content.id,
    };
  });

  const [state, setState] = React.useState({
    dialogState: {
      editor: '',
      selected: contentAsOptions[0],
    },
  });

  const generateInterface = {
    disabledWhen: () => {
      return wallet.contents.length !== 0;
    },
    dialogTitle: 'Generate',
    dialogSubmitTitle: 'Generate',
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary={'Generate'} />
        </ListItem>
      </List>
    ),
    dialogContent: (
      <CapturePasswordDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={(dialogState: any) => {
          setState({ dialogState });
        }}
      />
    ),
    handleSubmit: async () => {
      handleWalletOperation('generate', state.dialogState);
    },
    handleCancel: async () => {},
  };

  const exploreInterface = {
    disabledWhen: () => {
      return wallet.status === 'LOCKED' || wallet.contents.length === 0;
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary={'Explore'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Explore',
    dialogSubmitTitle: 'Explore',
    dialogContent: <ExploreDialogContent contents={wallet.contents} />,
    handleSubmit: async () => {
      handleWalletOperation('explore', state.dialogState);
    },
    handleCancel: async () => {},
  };

  const addInterface = {
    disabledWhen: () => {
      return wallet.status === 'LOCKED';
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={'Add'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Add',
    dialogSubmitTitle: 'Add',
    dialogContent: (
      <AddDialogContent
        value={state.dialogState.editor}
        onChange={(value) => {
          setState({
            ...state,
            dialogState: {
              ...state.dialogState,
              editor: value,
            },
          });
        }}
      />
    ),
    handleSubmit: async () => {
      handleWalletOperation('add', JSON.parse(state.dialogState.editor));
    },
    handleCancel: async () => {},
  };

  const removeInterface = {
    disabledWhen: () => {
      return wallet.status === 'LOCKED' || wallet.contents.length === 0;
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <RemoveIcon />
          </ListItemIcon>
          <ListItemText primary={'Remove'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Remove',
    dialogSubmitTitle: 'Remove',
    dialogContent: (
      <RemoveDialogContent
        value={state.dialogState.selected}
        options={contentAsOptions}
        onChange={(value) => {
          setState({
            ...state,
            dialogState: {
              ...state.dialogState,
              selected: value,
            },
          });
        }}
      />
    ),
    handleSubmit: async () => {
      handleWalletOperation('remove', state.dialogState.selected);
    },
    handleCancel: async () => {},
  };

  const exportInterface = {
    disabledWhen: () => {
      return wallet.status === 'LOCKED' || wallet.contents.length === 0;
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary={'Export'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Export',
    dialogSubmitTitle: 'Export',
    dialogContent: (
      <CapturePasswordDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={(dialogState: any) => {
          setState({ dialogState });
        }}
      />
    ),
    handleSubmit: async () => {
      handleWalletOperation('export', state.dialogState);
    },
    handleCancel: async () => {},
  };

  const image = 'https://via.placeholder.com/150';

  const status = wallet.status;
  const menuList: any = [];
  const actionsList: any = [];

  if (status === 'UNLOCKED') {
    menuList.push(addInterface);
    menuList.push(removeInterface);
  }

  if (status === 'UNLOCKED' && wallet.contents.length === 0) {
    actionsList.push(generateInterface);
  }

  if (status === 'UNLOCKED' && wallet.contents.length > 0) {
    actionsList.push(exportInterface);
  }

  if (status === 'UNLOCKED' && wallet.contents.length > 0) {
    actionsList.push(exploreInterface);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={status === 'UNLOCKED' ? classes.red : classes.blue}
          >
            {status === 'UNLOCKED' ? <LockOpenIcon /> : <LockIcon />}
          </Avatar>
        }
        action={<WalletMenu list={menuList} />}
        title="Universal Wallet"
        subheader={
          status === 'UNLOCKED'
            ? 'Unlocked and ready for use.'
            : 'Locked, a password is required before use.'
        }
      />
      <CardMedia className={classes.media} image={image} title="Wallet image" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This wallet implements the specification under development in the W3C
          CCG. To learn more,{' '}
          <a
            target={'_blank'}
            rel="noreferrer"
            href="https://github.com/w3c-ccg/universal-wallet-interop-spec"
          >
            click this link.
          </a>
        </Typography>
      </CardContent>

      <CardActions>
        {actionsList.map((item: any) => {
          return (
            <FullscreenDialog
              {...item}
              key={item.dialogTitle}
              dialogTrigger={
                <Button size="small" color="primary">
                  {item.dialogTitle}
                </Button>
              }
            />
          );
        })}
      </CardActions>
    </Card>
  );
};
