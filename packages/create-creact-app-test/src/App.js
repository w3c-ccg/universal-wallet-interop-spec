import React from "react";

import { Ed25519KeyPair } from "@transmute/did-key-ed25519";
import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";

import { wallet } from "./wallet";
import { documentLoader } from "./documentLoader";

function App() {
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    console.log("test...");
    (async () => {
      const content = await wallet.generateContentFromSeed(
        await wallet.passwordToKey("correct horse battery staple")
      );
      console.log({ content });

      content.forEach((content) => {
        wallet.add(content);
      });
      const exported = await wallet.export("correct horse battery staple");

      console.log({ exported });

      const keypair = {
        ...content[1],
      };

      const key = new Ed25519KeyPair(keypair);

      const suite = new Ed25519Signature2018({
        key,
        date: "2020-03-10T04:24:12.164Z",
      });

      const credential = await wallet.issue({
        credential: exported,
        options: {
          suite,
          documentLoader,
        },
      });

      console.log({ credential });

      setState({ ...credential });
    })();
  }, []);
  return (
    <div className="App">
      <h4>See developer console....</h4>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
