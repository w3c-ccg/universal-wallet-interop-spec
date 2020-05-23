import React from "react";
import HomePage from "./HomePage";

import { compose } from "redux";

import tmui from "../../store/tmui";

const container = compose(tmui.container);

export default container(props => {
  return <HomePage {...props} />;
});
