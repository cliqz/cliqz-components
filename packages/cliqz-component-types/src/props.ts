import { Link, LinkMetadata } from './results';

export interface t {
  (key: string): string,
}

export interface openLink {
  (link: Link, meta: LinkMetadata): void
}
