import db from './db.json';

export type Color = string;

export interface Rule {
  r: string;
  b?: Color;
  l: number;
}

export interface LogoDatabase {
  domains: {
    [domain: string]: Rule[];
  };
  buttons: number[];
  palette: string[];
}

const database: LogoDatabase = db;

export default database;
