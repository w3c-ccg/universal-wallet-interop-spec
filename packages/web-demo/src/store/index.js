import { connectRouter } from "connected-react-router";

// Reducers.
import tmui from "./tmui";
import history from "./history";

export default {
  router: connectRouter(history),
  tmui: tmui.reducer
};
