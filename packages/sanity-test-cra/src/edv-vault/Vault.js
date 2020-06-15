import React from "react";
import { UniversalWallet2020, VaultClient } from "@transmute/universal-wallet";
export function Vault() {
  return (
    <div className="Vault">
      <h1>Vault...</h1>
      <p>See developer console...</p>
      <button
        onClick={async () => {
          const wallet = await UniversalWallet2020.generate(
            Buffer.from(
              // 7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226
              "7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226",
              "hex"
            )
          );

          const vault_endpoint = "http://localhost:8080/edvs";

          const entropy = wallet.contents[0];
          const ed25519Key = wallet.contents[1];
          ed25519Key.controller = ed25519Key.id.split("#")[0];

          const x25519Key = wallet.contents[2];
          x25519Key.controller = x25519Key.id.split("#")[0];

          const client = await VaultClient.fromDerivedContents(
            vault_endpoint,
            ed25519Key,
            x25519Key,
            Buffer.from(entropy.value, "hex")
          );

          const doc1 = {
            id: "z1A6LudYMzfM1CGFrNXgjh2sN",
            // id: await EdvClient.generateId(),
            content: {
              schema: "https://schema.org/UniversalWallet",
              data: { yolo: 456 },
            },
          };
          await client.addWalletContent(doc1);
          const edv_contents = await client.getWalletContents();
          console.log("edv_contents...", edv_contents);
        }}
      >
        Test
      </button>
    </div>
  );
}
