import { storiesOf } from '@storybook/react';
import React from 'react';
import { MovieShowtimes } from '../src/index';
import { localResult, notLocalResult } from './movie-result';

storiesOf('Movie Showtimes', module).add('not local result', () => (
  <MovieShowtimes
    data={notLocalResult}
    local={false}
  />
));

storiesOf('Movie Showtimes', module).add('local result', () => (
  <MovieShowtimes data={localResult} local={true} />
));
