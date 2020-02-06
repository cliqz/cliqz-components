import { Result } from '@cliqz/component-types';
import { NewsResult } from '../../cliqz-component-ui-snippet-news/stories/news-result';

export const GENERIC_RESULT_WITH_HISTORY: Result = {
  title: "example",
  url: "https://example.com",
  description: "Lorem ipsum",
  friendlyUrl: "example.com",
  provider: "cliqz",
  type: "main",
  urls: [
    {
      title: "example",
      url: "https://example.com",
      description: "Lorem ipsum",
      friendlyUrl: "example.com",
      provider: "cliqz",
      type: "main",
      data: {},
    },
  ],
  data: {
  },
};

export const GENERIC_RESULT_WITH_NEWS: Result = {
  title: "example",
  url: "https://example.com",
  description: "Lorem ipsum",
  friendlyUrl: "example.com",
  provider: "cliqz",
  type: "main",
  urls: [],
  data: {
    deepResults: [
      NewsResult,
    ],
  },
};