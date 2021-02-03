import React, { FC, HTMLAttributes } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactJson from 'react-json-view';

import copy from 'copy-to-clipboard';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#bdbdbd',
  },
}));

export interface IWalletContentsTableDetailsProps
  extends HTMLAttributes<HTMLDivElement> {
  document: any;
}

export const ContentTableRow: FC<IWalletContentsTableDetailsProps> = ({
  document,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color={'primary'}>
        <Tabs value={value} onChange={handleChange} aria-label="Content">
          <Tab label="Source" {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ReactJson
          src={document}
          name={false}
          displayDataTypes={false}
          enableClipboard={(data) => {
            copy(JSON.stringify(data.src, null, 2));
          }}
        />
      </TabPanel>
    </div>
  );
};
