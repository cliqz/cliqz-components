import { storiesOf } from '@storybook/react';
import React from 'react';
import { Logo } from '../src/index';

const getLogoDetails = (domain: string): any => ({
  backgroundColor: 'red',
  backgroundImage: `https://static.cliqz.com/wp-content/uploads/2016/08/${domain}.jpg`,
  text: domain.substr(0, 2),
});
const getUrlDetails = (url: string): any => ({ domain: url });

storiesOf('Logo', module).add('Khaled', () => (
  <Logo
    url="khaled"
    getLogoDetails={getLogoDetails}
    getUrlDetails={getUrlDetails}
  />
));

storiesOf('Logo', module).add('Ravjit', () => (
  <Logo
    url="ravjit"
    getLogoDetails={getLogoDetails}
    getUrlDetails={getUrlDetails}
  />
));

storiesOf('Logo', module).add('Roberto', () => (
  <Logo
    url="roberto"
    getLogoDetails={getLogoDetails}
    getUrlDetails={getUrlDetails}
  />
));
