import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import GuideExample from '../../../stories/GuideExample';
import doc from './SubNav.md';
import greenBlueBg from '../../../stories/images/subNav-greenBlue-bg.png';
import Button from '../../Button/Button';
import SubNav, {
  SubNavTitle,
  SubNavList,
  SubNavLink,
  SubNavActions
} from '../';

storiesOf('SubNav', module).add(
  'Basic',
  withInfo(doc)(() => (
    <div>
      <GuideExample>
        <SubNav>
          <SubNavTitle href="#">Fields</SubNavTitle>
          <SubNavList>
            <SubNavLink active href="#">
              Glens
            </SubNavLink>
            <SubNavLink href="#">Dales</SubNavLink>
            <SubNavLink href="#">Meadows</SubNavLink>
          </SubNavList>
        </SubNav>
      </GuideExample>
      <GuideExample label="blue">
        <SubNav blue>
          <SubNavTitle href="#">Fields</SubNavTitle>
          <SubNavList>
            <SubNavLink active href="#">
              Glens
            </SubNavLink>
            <SubNavLink href="#">Dales</SubNavLink>
            <SubNavLink href="#">Meadows</SubNavLink>
          </SubNavList>
        </SubNav>
      </GuideExample>
      <GuideExample label="with actions">
        <SubNav blue>
          <SubNavTitle href="#">Fields</SubNavTitle>
          <SubNavList>
            <SubNavLink active href="#">
              Glens
            </SubNavLink>
            <SubNavLink href="#">Dales</SubNavLink>
            <SubNavLink href="#">Meadows</SubNavLink>
          </SubNavList>
          <SubNavActions>
            <Button white small>
              New Field
            </Button>
          </SubNavActions>
        </SubNav>
      </GuideExample>
      <GuideExample label="backgroundImage">
        <SubNav
          backgroundImage={greenBlueBg}
          gradientFromColor="#70be49"
          gradientToColor="#1688aa"
        >
          <SubNavTitle href="#" style={{ color: '#fff' }}>
            Fields
          </SubNavTitle>
          <SubNavList>
            <SubNavLink active href="#">
              Glens
            </SubNavLink>
            <SubNavLink href="#">Dales</SubNavLink>
            <SubNavLink href="#">Meadows</SubNavLink>
          </SubNavList>
        </SubNav>
      </GuideExample>
    </div>
  ))
);
