import { ComponentType } from 'react';
import { UniversalViewStyle } from '@cliqz/component-styles';

export interface Result {
  title: string
  description: string
  url: string
  friendlyUrl: string
  provider: string
  type: string
  urls?: Result[]
}

export interface t {
  (key: string): string,
}

export type ImageRendererComponent = ComponentType<{
  source: string;
  color: string;
  style?: UniversalViewStyle | UniversalViewStyle[];
}>;
