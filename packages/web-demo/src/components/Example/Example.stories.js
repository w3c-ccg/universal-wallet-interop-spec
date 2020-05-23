import React from "react";
import Button from "@material-ui/core/Button";
import { Example } from "./Example";

import { UniversalWallet2020 } from "@transmute/universal-wallet";
export default {
  title: "Example",
  component: Example,
};

const password = "storybook";

export const Generate = () => (
  <div>
    <Button
      variant={"contained"}
      onClick={async () => {
        const seed = await UniversalWallet2020.passwordToSeed(password);
        const wallet = await UniversalWallet2020.generate(seed);
        console.log(JSON.stringify(wallet.contents, null, 2));
      }}
    >
      Generate
    </Button>
  </div>
);

export const Export = () => (
  <div>
    <Button
      variant={"contained"}
      onClick={async () => {
        const seed = await UniversalWallet2020.passwordToSeed(password);
        const wallet = await UniversalWallet2020.generate(seed);
        await wallet.lock(password);
        const exported = wallet.export();
        console.log(exported);
      }}
    >
      Export
    </Button>
  </div>
);

// export const Default = () => (
//   <div>
//     <Example Example />
//   </div>
// );
