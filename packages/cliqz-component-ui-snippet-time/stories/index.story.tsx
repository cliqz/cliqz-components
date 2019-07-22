import { storiesOf } from '@storybook/react';
import React from 'react';
import { Time } from '../src/index';
import { timeCityResult } from './time-result';
import { timeCountryResult} from './time-result';

storiesOf('TimeSnippet', module).add('Berlin', () => (
  <Time data={timeCityResult}/>
));

storiesOf('TimeSnippet', module).add('Australia', () => (
  <Time data={timeCountryResult} />
));
