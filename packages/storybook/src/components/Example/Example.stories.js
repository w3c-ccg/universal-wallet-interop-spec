import React from "react";
import { UniversalWallet } from "@transmute/material-did-core";

import { UniversalWallet2020 } from "@transmute/universal-wallet";

import { unlockedContents, lockedContents } from "./fixtures";

export default {
  title: "Universal Wallet",
};

const image =
  "https://www.transmute.industries/svg/Logo-Transmute-icon-Purp.svg";

const Default = (props) => {
  const [walletState, setWalletState] = React.useState({
    status: props.status,
    contents: props.contents,
  });

  const toggleLockStatus = async ({ status, password, contents }) => {
    console.log("toggleLockStatus", { status, password, contents });
    let wallet = new UniversalWallet2020(contents);
    wallet.status = status;

    if (status === "LOCKED") {
      await wallet.unlock(password);
    }
    if (status === "UNLOCKED") {
      await wallet.lock(password);
    }
    // console.log(JSON.stringify(wallet.contents, null, 2));
    setWalletState({
      status: wallet.status,
      contents: wallet.contents,
    });
  };

  const deleteWallet = () => {
    console.log("deleteWallet");
    setWalletState({
      status: "UNLOCKED",
      contents: [],
    });
  };

  const importWallet = async (encryptedWallet) => {
    console.log("importWallet", encryptedWallet);
    let wallet = new UniversalWallet2020();
    await wallet.import(encryptedWallet);
    // console.log('wallet', wallet);
    setWalletState({
      status: wallet.status,
      contents: wallet.contents,
    });
  };

  const exportWallet = (status, contents) => {
    console.log("exportWallet", status, contents);
    if (status !== "LOCKED") {
      throw new Error("Cannot export unlocked wallet.");
    }
    let wallet = new UniversalWallet2020(contents);
    wallet.status = status;
    return wallet.export();
  };

  const generateWallet = async () => {
    console.log("generateWallet");
    const password = "storybook";
    const seed = await UniversalWallet2020.passwordToSeed(password);
    let wallet = await UniversalWallet2020.generate(seed);
    setWalletState({
      status: wallet.status,
      contents: wallet.contents,
    });
  };

  const saveWallet = (contents) => {
    console.log("saveWallet", contents);
    setWalletState({
      contents,
    });
  };

  return (
    <div>
      <UniversalWallet
        walletState={walletState}
        image={image}
        importWallet={importWallet}
        exportWallet={exportWallet}
        toggleLockStatus={toggleLockStatus}
        saveWallet={saveWallet}
        deleteWallet={deleteWallet}
        generateWallet={generateWallet}
        {...props}
      />
    </div>
  );
};

export const Empty = () => {
  return <Default status={"UNLOCKED"} contents={[]} />;
};

export const Unlocked = () => {
  return <Default status={"UNLOCKED"} contents={unlockedContents} />;
};

export const Locked = () => {
  return <Default status="LOCKED" contents={lockedContents} />;
};
