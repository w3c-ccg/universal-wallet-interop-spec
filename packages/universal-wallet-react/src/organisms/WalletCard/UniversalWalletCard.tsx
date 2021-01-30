import React, { FC, HTMLAttributes } from 'react';

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
// import LockIcon from '@material-ui/icons/Lock';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
// import ArchiveIcon from '@material-ui/icons/Archive';
// import UnarchiveIcon from '@material-ui/icons/Unarchive';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import CreateIcon from '@material-ui/icons/Create';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExploreIcon from '@material-ui/icons/Explore';

import { Card } from './Card';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

import {
  GenerateDialog,
  GenerateDialogContent,
} from '../../molecules/dialogs/GenerateDialog';

import {
  ExploreDialog,
  ExploreDialogContent,
} from '../../molecules/dialogs/ExploreDialog';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  wallet: any;
  handleWalletOperation: any;
}

export const UniversalWalletCard: FC<Props> = ({
  wallet,
  handleWalletOperation,
}) => {
  const [state, setState] = React.useState({
    dialogState: {},
  });

  const { dialogState } = state;

  const args = {
    image: 'https://via.placeholder.com/150',
    status: wallet.status,
    menu: [
      {
        title: 'Generate',
        disabledWhen: () => {
          return wallet.status === 'LOCKED';
        },
        icon: CreateNewFolderIcon,
        iconProps: {},
        dialog: GenerateDialog,
        dialogProps: {
          dialogTitle: 'Generate',
          dialogSubmitTitle: 'Generate',
          dialogContent: (
            <GenerateDialogContent
              seedToId={seedToId}
              passwordToKey={passwordToKey}
              setDialogState={(dialogState: any) => {
                setState({ dialogState });
              }}
            />
          ),
          handleSubmit: async () => {
            handleWalletOperation('generate', dialogState);
          },
          handleCancel: async () => {},
        },
      },
      {
        title: 'Explore',
        disabledWhen: () => {
          return wallet.status === 'LOCKED';
        },
        icon: ExploreIcon,
        iconProps: {},
        dialog: ExploreDialog,
        dialogProps: {
          dialogTitle: 'Explore',
          dialogSubmitTitle: 'Explore',
          dialogContent: <ExploreDialogContent contents={wallet.contents} />,
          handleSubmit: async () => {
            handleWalletOperation('explore', dialogState);
          },
          handleCancel: async () => {},
        },
      },
    ],
  };

  return <Card {...args} />;
};
