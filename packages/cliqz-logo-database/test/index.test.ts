/*!
 * Copyright (c) 2019-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import logoDatabase from '../src/db.json';
import getLogo, { defaultDatabase } from '../src/index';
import logo from '../src/logo';

describe('export default', () => {
  it('is getLogo function', () => {
    expect(getLogo).toEqual(logo);
  });
});

describe('export defaultDatabase', () => {
  it('is logo database', () => {
    expect(defaultDatabase).toEqual(logoDatabase);
  });
});
