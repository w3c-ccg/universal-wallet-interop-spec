import { withHandlers } from "recompose";

export default withHandlers({
  setTmuiProp: ({ setTmuiProp }) => payload => {
    setTmuiProp(payload);
  },
  doToggleSpeedDial: ({ setTmuiProp }) => payload => {
    setTmuiProp({ isSpeedDialogOpen: payload });
  },
  doSelectActiveTab: ({ setTmuiProp }) => activeTabIndex => {
    setTmuiProp({ activeTabIndex });
  },

  doFabClick: ({ setTmuiProp }) => context => {
    setTmuiProp({ fabClick: context });
  }
});
