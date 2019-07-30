/*!
 * Copyright (c) 2019-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
