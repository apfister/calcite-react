// Framework and third-party non-ui
import React from 'react';
import PropTypes from 'prop-types';

// Redux operations and local helpers/utils/modules
import withRefs from '../utils/withRefs';

// Component specific modules (Component-styled, etc.)
import {
  StyledArcgisAccountMenu,
  StyledArcgisAccountContent,
  StyledArcgisAccountSignInMenu
} from './ArcgisAccount-styled';
import ArcgisAccountContentInfo from './ArcgisAccountContentInfo';
import ArcgisAccountContentMenu from './ArcgisAccountContentMenu';

// App components
import Button from '../Button';

// Third-party components (buttons, icons, etc.)

// JSON

// CSS

const ArcgisAccountMenu = ({
  children,
  user,
  portal,
  avatar,
  switchAccountLabel,
  signOutLabel,
  onRequestSwitchAccount,
  onRequestSignOut,
  forwardedRef,
  ...other
}) => {
  return (
    <StyledArcgisAccountMenu ref={forwardedRef} {...other}>
      <StyledArcgisAccountContent>
        <ArcgisAccountContentInfo user={user} portal={portal} avatar={avatar} />
        <ArcgisAccountContentMenu>{children}</ArcgisAccountContentMenu>
      </StyledArcgisAccountContent>
      <StyledArcgisAccountSignInMenu>
        <Button grouped half extraLarge onClick={onRequestSwitchAccount}>
          {switchAccountLabel}
        </Button>
        <Button halo grouped half extraLarge onClick={onRequestSignOut}>
          {signOutLabel}
        </Button>
      </StyledArcgisAccountSignInMenu>
    </StyledArcgisAccountMenu>
  );
};

ArcgisAccountMenu.propTypes = {
  /** AGOL user object */
  user: PropTypes.object,
  /** Text label for the Switch Account button */
  switchAccountLabel: PropTypes.string,
  /** Text label for the Sign Out button */
  signOutLabel: PropTypes.string
};

ArcgisAccountMenu.defaultProps = {
  switchAccountLabel: 'Switch Account',
  signOutLabel: 'Sign Out'
};

export default withRefs(ArcgisAccountMenu);
