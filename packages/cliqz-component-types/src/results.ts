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

export interface Link {
  url: string
  title?: string
}

export interface LinkMetadata {
  isHistory?: boolean
  type: string
  index?: number
}

export interface Result extends Link {
  description: string
  friendlyUrl: string
  provider: string
  type: string
  urls?: Result[]
  data: {
    deepResults?: NewsDeepResult[]
  }
}
