import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import GuideExample from '../../../stories/GuideExample';
import doc from './Select.md';
import Alert from '../../Alert';
import Card, { CardTitle, CardContent } from '../../Card';
import Select from '../';

storiesOf('Select', module)
  .add(
    'Basic',
    withInfo(doc)(() => (
      <div>
        <GuideExample>
          <Select input={<input />} onChange={action('onChange')}>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </GuideExample>
      </div>
    ))
  )
  .add(
    'Ridiculous Example',
    withInfo(doc)(() => (
      <div>
        <GuideExample>
          <Select input={<input />} onChange={action('onChange')}>
            <li value={10}>Go to Online</li>
            <option value={20}>Help</option>
            <Alert value={30}>Sign Out</Alert>
            <div value={40}>I'm a div!</div>
            <Card
              value={50}
              bar="green"
              style={{ margin: '0 5px', width: '300px' }}
            >
              <CardContent>
                <CardTitle>Card with Colored Bar</CardTitle>
                <p>
                  Every color in calcite can be used as a colored "bar" along
                  the top of a card to provide a bit of visual punch with{' '}
                  <code>bar="{'{color}'}"</code>
                </p>
              </CardContent>
            </Card>
          </Select>
        </GuideExample>
      </div>
    ))
  );
