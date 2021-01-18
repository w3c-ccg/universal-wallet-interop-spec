export interface WalletInterfaceMenuItemDialogProps {
  dialogTitle: any;
  dialogSubmitTitle: any;
  handleCancel: any;
  handleSubmit: any;
  wallet: any;
}

export interface FullscreenDialog extends WalletInterfaceMenuItemDialogProps {
  trigger: any;
}

export interface WalletInterfaceMenuItem {
  title: string;
  disabledWhen: () => boolean;
  icon: any;
  iconProps: any;
  dialog: any;
  dialogProps: WalletInterfaceMenuItemDialogProps;
}
