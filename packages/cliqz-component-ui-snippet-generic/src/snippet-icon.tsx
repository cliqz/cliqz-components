/* eslint-disable react/prop-types */
/*!
* Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { UniversalViewStyle } from '@cliqz/component-styles';
import React from 'react';
import { View } from 'react-native';
import { LogoComponent } from './types';

interface SnipperIconStyles {
  symbolContainer: UniversalViewStyle,
  bullet: UniversalViewStyle,
}

export const styles: SnipperIconStyles = {
  symbolContainer: {
    width: 28,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 6,
  },
  bullet: {
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    borderColor: 'rgba(0, 0, 0, 0.61)',
    width: 5,
    height: 5,
    marginTop: (20 - 5) / 2,
    borderRadius: 1,
  },
};

export const SnippetIcon = (
  { type, url, LogoComponent }:
  { type: string, url: string, LogoComponent: LogoComponent }
) => {
  let symbol: any;

  switch (type) {
    case 'main':
      symbol = <LogoComponent size={28} url={url} />;
    break;
    default:
      symbol = <View style={styles.bullet} />;
  }

  return <View style={styles.symbolContainer}>{symbol}</View>;
};
