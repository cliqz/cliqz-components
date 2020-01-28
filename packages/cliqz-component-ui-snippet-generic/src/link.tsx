/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import { TouchableWithoutFeedback, View, Platform } from 'react-native';

interface LinkProps {
  style?: any
  label?: string
  url?: string
  action?: string
  param?: string
  onPress?(e: any): void
  children?: any
}

export class Link extends React.Component<LinkProps> {
  _onPress = (e: any) => {
    const { url, onPress } = this.props;
    let { action, param } = this.props;
    e.stopPropagation();

    action = url ? 'openLink' : action;
    param = url || param;

    // callback onPress
    if (onPress) {
      onPress(e);
    }
  };

  render() {
    const { style, label, url, children } = this.props;
    return Platform.select({
      default: (
        <TouchableWithoutFeedback onPress={this._onPress}>
          <View {...this.props} />
        </TouchableWithoutFeedback>
      ),
      web: (
        <View style={style}>
          <div
            aria-label={label}
            data-url={url}
            onClick={this._onPress}
            role="presentation"
          >
            {children}
          </div>
        </View>
      ),
    });
  }
}
