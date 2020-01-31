/* eslint-disable react/prop-types */
/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import { View, Text, TouchableWithoutFeedback, TextStyle } from 'react-native';
import { descriptionColor, separatorColor } from './styles';
import { t, ImageRendererComponent } from './types';

export interface SnippetListStyles {
  list: UniversalViewStyle
  footer: UniversalViewStyle
  footerText: TextStyle
  arrow: UniversalViewStyle
  separatorStyle: UniversalViewStyle
}

const baseStyles: SnippetListStyles = {
  list: {
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12.5,
    color: descriptionColor,
  },
  arrow: {
    height: 8,
    width: 12,
    marginLeft: 5,
  },
  separatorStyle: {
    marginTop: 0,
    marginBottom: 0,
    borderTopColor: separatorColor,
    borderTopWidth: 1,
    marginLeft: 29,
  },
};

export { baseStyles as styles };

interface SnippetListProps {
  limit: number
  expandStep: number
  t: t
  list: JSX.Element[]
  styles?: Partial<SnippetListStyles>
  ImageRendererComponent: ImageRendererComponent
}

interface SnippetListState {
  limit: number
}

export class SnippetList extends React.PureComponent<SnippetListProps, SnippetListState> {
  constructor(props: SnippetListProps) {
    super(props);
    this.state = {
      limit: props.limit,
    };
  }

  onFooterPressed = (isCollapsed: boolean) => {
    const { expandStep, limit } = this.props;
    if (isCollapsed) {
      this.setState(({ limit: previousLimit }) => ({
        limit: previousLimit + expandStep,
      }));
    } else {
      this.setState({ limit });
    }
  };

  getFooter = (isCollapsed: boolean, styles: SnippetListStyles) => {
    const { list, limit, t, ImageRendererComponent } = this.props;

    if (list.length <= limit) {
      return null;
    }
    const footerText = t(isCollapsed ? 'expand' : 'collapse');
    const arrowAngle: Partial<UniversalViewStyle> = {
      transform: [{ rotateX: isCollapsed ? '0deg' : '180deg' }],
    };
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onFooterPressed(isCollapsed)}
      >
        <View style={styles.footer}>
          <Text style={styles.footerText}>{footerText.toUpperCase()}</Text>
          <ImageRendererComponent
            source="ic_ez_arrow-down"
            style={[styles.arrow, arrowAngle]}
            color="#9c9c9c"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { styles: extendedStyles, list } = this.props;
    const styles = merge(baseStyles, extendedStyles)
    const { limit } = this.state;
    const isCollapsed = list.length > limit;
    const data = list.slice(0, limit);
    return (
      <View style={styles.list}>
        <View style={styles.separatorStyle} />
        <View>
          {data.map((snippet, i) => (
            <View key={snippet.key || ''}>
              {snippet}
              {i !== data.length - 1 && <View style={styles.separatorStyle} />}
            </View>
          ))}
        </View>
        {this.getFooter(isCollapsed, styles)}
      </View>
    );
  }
}
