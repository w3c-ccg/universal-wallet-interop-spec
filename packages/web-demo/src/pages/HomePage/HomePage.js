import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";

import { WebKeystore } from "@transmute/material-did-core";
import { UniversalWallet2020 } from "@transmute/universal-wallet";

const image =
  "https://www.transmute.industries/svg/Logo-Transmute-icon-Purp.svg";

const HomePage = (props) => {
  const { tmui, setTmuiProp } = props;

  const [keystore, setKeystore] = React.useState({
    data: null,
  });

  const toggleLockStatus = ({ status, password, data }) => {
    console.log("toggleLockStatus", { status, password, data });

    let walletInput =
      typeof data === "string" ? data : { keys: Object.values(data) };
    // let wallet = didWallet.create(walletInput);
    let wallet = new UniversalWallet2020();
    if (status === "locked") {
      wallet.unlock(password);
    }
    if (status === "unlocked") {
      wallet.lock(password);
    }
    setKeystore({
      data: wallet.keys || wallet.ciphered,
    });
  };

  const deleteKeystore = () => {
    console.log("deleteKeystore");
    setKeystore({
      data: null,
    });
  };

  const importKeystore = (data) => {
    console.log("importKeystore");
    setKeystore({
      data,
    });
  };

  const generateKeystore = () => {
    console.log("generateKeystore");
    let wallet = new UniversalWallet2020();
    wallet.add({
      id: "urn:uuid:e8fc7810-9524-11ea-bb37-0242ac130002",
      title: "My Test Key 2",
      image: "https://via.placeholder.com/150",
      description: "For testing only, totally compromised.",
      tags: ["professional", "organization", "compromised"],
      correlation: ["4058a72a-9523-11ea-bb37-0242ac130002"],
      controller: [
        "did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r",
      ],
      type: "Ed25519VerificationKey2018",
      privateKeyBase58:
        "3CQCBKF3Mf1tU5q1FLpHpbxYrNYxLiZk4adDtfyPEfc39Wk6gsTb2qoc1ZtpqzJYdM1rG4gpaD3ZVKdkiDrkLF1p",
      publicKeyBase58: "6GwnHZARcEkJio9dxPYy6SC5sAL6PxpZAB6VYwoFjGMU",
    });
    setKeystore({
      contents: wallet.contents,
    });
  };

  const saveKeystore = (data) => {
    console.log("saveKeystore", data);
    setKeystore({
      data,
    });
  };

  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        Universal Wallet Demo
      </Typography>
      <WebKeystore
        keystore={keystore}
        image={image}
        importKeystore={importKeystore}
        toggleLockStatus={toggleLockStatus}
        saveKeystore={saveKeystore}
        deleteKeystore={deleteKeystore}
        generateKeystore={generateKeystore}
      />
    </BasePage>
  );
};

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default HomePage;
