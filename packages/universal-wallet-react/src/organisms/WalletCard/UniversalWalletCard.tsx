import React, { FC, HTMLAttributes } from 'react';

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

import { buildGenerateInterface } from '../../molecules/dialogs/GenerateDialog';
import { buildExploreInterface } from '../../molecules/dialogs/ExploreDialog';
import { buildAddInterface } from '../../molecules/dialogs/AddDialog';
import { buildRemoveInterface } from '../../molecules/dialogs/RemoveDialog';
import { buildExportInterface } from '../../molecules/dialogs/ExportDialog';
import { buildImportInterface } from '../../molecules/dialogs/ImportDialog';

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

  const [state, setState] = React.useState({
    dialogState: {
      editor: '',
      password: '',
      selected: {},
    },
  });

  const setDialogState = (dialogState: any) => {
    setState({
      ...state,
      dialogState: {
        ...state.dialogState,
        ...dialogState,
      },
    });
  };

  const image = 'https://via.placeholder.com/150';

  const status = wallet.status;
  const menuList: any = [];
  const actionsList: any = [];

  if (status === 'UNLOCKED' && wallet.contents.length === 0) {
    actionsList.push(
      buildGenerateInterface(wallet, setDialogState, () => {
        handleWalletOperation('generate', state.dialogState);
      })
    );

    actionsList.push(
      buildImportInterface(wallet, setDialogState, () => {
        handleWalletOperation('import', {
          password: state.dialogState.password,
          encryptedWalletCredential: JSON.parse(state.dialogState.editor),
        });
      })
    );
  }

  if (status === 'UNLOCKED') {
    menuList.push(
      buildAddInterface(wallet, state.dialogState, setDialogState, () => {
        handleWalletOperation('add', JSON.parse(state.dialogState.editor));
      })
    );
    menuList.push(
      buildRemoveInterface(wallet, state.dialogState, setDialogState, () => {
        handleWalletOperation('remove', state.dialogState.selected);
      })
    );
  }

  if (status === 'UNLOCKED' && wallet.contents.length > 0) {
    actionsList.push(
      buildExploreInterface(wallet, () => {
        handleWalletOperation('explore', state.dialogState);
      })
    );
  }

  if (status === 'UNLOCKED' && wallet.contents.length > 0) {
    actionsList.push(
      buildExportInterface(wallet, setDialogState, () => {
        handleWalletOperation('export', state.dialogState);
      })
    );
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
