import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { NewsItem } from './results';

export type NewsComponent = ComponentType<{
  news: {
    type: 'news' | 'top-news',
    links: NewsItem[]
  }
}>;

export type LogoComponent = ComponentType<{
  size: number
  url: string
}>

interface WebViewStyles {
  cursor?: 'pointer' | 'default';
}

export type UniversalViewStyle = ViewStyle & WebViewStyles;

export type ImageRendererComponent = ComponentType<{
  source: string;
  color: string;
  style?: UniversalViewStyle | UniversalViewStyle[];
}>;

