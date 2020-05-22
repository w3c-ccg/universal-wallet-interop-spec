import React from "react";
import { ClickableDID } from "@transmute/material-did-core";
// import PropTypes from "prop-types";

export const Example = () => {
  return (
    <div>
      <ClickableDID
        did="did:example:123"
        onClick={() => {
          console.log("yolo");
        }}
      />
    </div>
  );
};

Example.propTypes = {};
