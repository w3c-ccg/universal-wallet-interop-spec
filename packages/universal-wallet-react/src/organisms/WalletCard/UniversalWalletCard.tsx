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
import { red, blue, yellow, green } from '@material-ui/core/colors';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SyncIcon from '@material-ui/icons/Sync';

import { FullscreenDialog } from '../../atoms/FullscreenDialog';

import { WalletMenu } from '../WalletMenu';

import { buildGenerateInterface } from '../../molecules/dialogs/GenerateDialog';
import { buildExploreInterface } from '../../molecules/dialogs/ExploreDialog';
import { buildAddInterface } from '../../molecules/dialogs/AddDialog';
import { buildRemoveInterface } from '../../molecules/dialogs/RemoveDialog';
import { buildExportInterface } from '../../molecules/dialogs/ExportDialog';
import { buildImportInterface } from '../../molecules/dialogs/ImportDialog';
import { buildIssueCredentialInterface } from '../../molecules/dialogs/IssueCredentialDialog';
import { buildVerifiablePresentationDialogInterface } from '../../molecules/dialogs/CreateVerifiablePresentationDialog';
import { buildVerifyInterface } from '../../molecules/dialogs/VerifyDialog';
import { buildSyncContentInterface } from '../../molecules/dialogs/SyncContentDialog';

import CircularProgress from '@material-ui/core/CircularProgress';

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
  green: {
    backgroundColor: green[500],
  },
  yellow: {
    backgroundColor: yellow[800],
  },
  spinnerLoading: {
    color: green[500],
    position: 'absolute',
  },
}));

export interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  loading: boolean;
  wallet: any;
  handleWalletOperation: any;
}

export const UniversalWalletCard: FC<Props> = ({
  image,
  loading,
  wallet,
  handleWalletOperation,
}) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    dialogState: {
      editor: '',
      domain: 'example.com',
      challenge: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
      selected: {},
      edvEndpoint: 'https://staging.data-vault.transmute.industries/edvs',
      edvFilter: 'https://schema.org/UniversalWallet',
      password: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
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
    menuList.push(
      buildSyncContentInterface(
        wallet,
        state.dialogState,
        setDialogState,
        () => {
          handleWalletOperation('sync', state.dialogState);
        }
      )
    );
  }

  if (status === 'UNLOCKED' && wallet.contents.length > 0) {
    menuList.push(
      buildExportInterface(wallet, setDialogState, () => {
        handleWalletOperation('export', state.dialogState);
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
      buildIssueCredentialInterface(wallet, setDialogState, () => {
        const keypair = wallet.contents.find((i: any) => {
          return i.id === (state.dialogState.selected as any).value;
        });

        const credential = JSON.parse(state.dialogState.editor);

        if (typeof credential.issuer === 'string') {
          credential.issuer = keypair.controller;
        } else {
          credential.issuer.id = keypair.controller;
        }

        handleWalletOperation('issue', {
          keypair,
          credential,
        });
      })
    );

    actionsList.push(
      buildVerifiablePresentationDialogInterface(
        wallet,
        state.dialogState,
        setDialogState,
        () => {
          const keypair = wallet.contents.find((i: any) => {
            return i.id === (state.dialogState.selected as any).value;
          });

          const verifiableCredential = JSON.parse(state.dialogState.editor);

          handleWalletOperation('present', {
            keypair,
            domain: state.dialogState.domain,
            challenge: state.dialogState.challenge,
            verifiableCredential,
          });
        }
      )
    );

    actionsList.push(
      buildVerifyInterface(wallet, state.dialogState, setDialogState, () => {
        // credential or presentation
        const content = JSON.parse(state.dialogState.editor);
        handleWalletOperation('verify', {
          domain: state.dialogState.domain,
          challenge: state.dialogState.challenge,
          content,
        });
      })
    );
  }

  const avatarColor = loading
    ? classes.yellow
    : status === 'UNLOCKED'
    ? classes.green
    : classes.blue;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="status" className={avatarColor}>
            {loading ? (
              <>
                <SyncIcon />
                <CircularProgress className={classes.spinnerLoading} />
              </>
            ) : (
              <>{status === 'UNLOCKED' ? <LockOpenIcon /> : <LockIcon />} </>
            )}
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
