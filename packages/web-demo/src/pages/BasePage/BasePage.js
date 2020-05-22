import React from 'react';
import PropTypes from 'prop-types';

import Theme from '../../components/Theme/Theme';

import AppBarWithDrawer from '../../components/AppBarWithDrawer/AppBarWithDrawer';
import DrawerContent from '../../components/AppBarWithDrawer/DrawerContent';
import rightHandAccountMenu from '../../components/AppBarWithDrawer/rightHandAccountMenu';

import logo from '../../assets/logo.svg';

const BasePage = ({ tmui, setTmuiProp, children }) => (
  <Theme>
    <AppBarWithDrawer
      rightHandAccountMenu={rightHandAccountMenu}
      headerImage={logo}
      drawer={<DrawerContent tmui={tmui} setTmuiProp={setTmuiProp} />}
      content={children}
    />
  </Theme>
);

BasePage.propTypes = {
  children: PropTypes.any.isRequired,
  tmui: PropTypes.any,
  setTmuiProp: PropTypes.any,
};

export default BasePage;
