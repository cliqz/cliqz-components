import { ComponentType } from 'react';
import { UniversalViewStyle } from '@cliqz/component-styles';

export interface NewsItem {
  extra: {
    creation_timestamp: number;
    domain?: string;
    thumbnail: string;
    breaking?: boolean;
    description?: string;
    media?: string;
    murl?: string;
  };
  title: string;
  url: string;
}

export interface NewsDeepResult {
  links: NewsItem[];
  type: 'news' | 'top-news';
}

export interface Result {
  title: string
  description: string
  url: string
  friendlyUrl: string
  provider: string
  type: string
  urls?: Result[]
  data: {
    deepResults?: NewsDeepResult[]
  }
}

export interface t {
  (key: string): string,
}

export type ImageRendererComponent = ComponentType<{
  source: string;
  color: string;
  style?: UniversalViewStyle | UniversalViewStyle[];
}>;

export type NewsComponent = ComponentType<{
  news: {
    type: 'news' | 'top-news',
    links: NewsItem[]
  }
}>;
