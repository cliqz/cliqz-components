/* eslint-disable react/prop-types */
/*!
* Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import React, { ComponentType, useMemo } from 'react';
import { Text, View, TextStyle } from 'react-native';
import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import { SnippetIcon, LogoComponent } from './snippet-icon';
import { Link } from './link';
import { isSwitchToTab } from './helpers';
import {
  resultTitleFontSize,
  linkColor,
  visitedColor,
  urlColor,
  unsafeUrlColor,
  descriptionColor,
  backgroundColor,
} from './styles';
import { Result, t, ImageRendererComponent } from './types';

const httpsLockWidth = 12;
const httpsLockMarginRight = 2;

export interface SnippetStyles {
  container: UniversalViewStyle
  rightContainer: UniversalViewStyle
  mainTitle: TextStyle
  subTitle: TextStyle
  visitedTitle: TextStyle
  urlContainer: UniversalViewStyle
  url: TextStyle
  lock: UniversalViewStyle
  lockColor: {
    color: string
  }
  lockBreakColor: {
    color: string
  }
  description: TextStyle
  switchToTabText: TextStyle
}

export const baseStyles: SnippetStyles = {
  container: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 6,
    paddingRight: 2,
  },
  rightContainer: {
    flex: 1,
    flexGrow: 1,
    paddingRight: 0,
  },
  mainTitle: {
    color: linkColor,
    fontSize: resultTitleFontSize,
    lineHeight: 20,
    marginTop: (28 - 20) / 2,
  },
  subTitle: {
    color: linkColor,
    fontSize: 14.5,
    lineHeight: 20,
  },
  visitedTitle: {
    color: visitedColor,
  },
  urlContainer: {
    flexDirection: 'row',
    paddingRight: httpsLockWidth + httpsLockMarginRight,
    alignItems: 'center',
    paddingBottom: 2,
  },
  url: {
    color: urlColor,
    fontSize: 13.5,
  },
  lock: {
    width: httpsLockWidth,
    height: httpsLockWidth * 1.3,
    marginRight: httpsLockMarginRight,
  },
  lockColor: {
    color: urlColor,
  },
  lockBreakColor: {
    color: unsafeUrlColor,
  },
  description: {
    color: descriptionColor,
    fontSize: 14.5,
    marginTop: 2,
  },
  switchToTabText: {
    color: descriptionColor,
    fontSize: 9,
    textAlign: 'right',
    lineHeight: 9,
    position: 'absolute',
    top: -8,
    right: 0,
    fontWeight: '300',
    backgroundColor: backgroundColor,
    paddingLeft: 5,
  },
};

export { baseStyles as styles };

const isHistory = (result: Result) => result.provider === 'history' || result.provider === 'tabs';

export interface openLink {
  (url: string, type?: string): void
}

export const Snippet = (
  {
    type,
    LogoComponent,
    ImageRendererComponent,
    result,
    openLink,
    t,
    styles: extendedStyles,
  }:
  {
    type: string,
    LogoComponent: LogoComponent,
    ImageRendererComponent: ImageRendererComponent,
    result: Result,
    openLink: openLink,
    t: t,
    styles?: Partial<SnippetStyles>
  }
) => {
  const styles = useMemo(() => merge(baseStyles, extendedStyles), [extendedStyles]);
  const { title, friendlyUrl, description, provider, url } = result;
  const titleLines = type === 'main' ? 2 : 1;
  const titleStyle = type === 'main' ? [styles.mainTitle] : [styles.subTitle];
  if (isHistory(result)) {
    titleStyle.push(styles.visitedTitle);
  }
  return (
    <Link onPress={() => openLink(url, type)}>
      <View style={styles.container}>
        <SnippetIcon type={type} LogoComponent={LogoComponent} url={url} />
        <View style={styles.rightContainer}>
        {isSwitchToTab(result) && (
          <Text style={styles.switchToTabText}>
            {t('search_switch_to_tab')}
          </Text>
        )}
        <Text numberOfLines={titleLines} style={titleStyle}>
          {title}
        </Text>
        <View
          accessibilityLabel="https-lock"
          accessible={false}
          style={styles.urlContainer}
        >
        <ImageRendererComponent
          style={styles.lock}
          color={
            url.startsWith('https')
            ? styles.lockColor.color
            : styles.lockBreakColor.color
          }
          source={
            url.startsWith('https') ? 'lock_verified' : 'lock_not_verified'
          }
        />
        <Text
          numberOfLines={1}
          style={[
            styles.url,
            url.startsWith('https') ? null : styles.lockBreakColor,
          ]}
          >
          {friendlyUrl}
        </Text>
        </View>
          {description ? (
            <Text numberOfLines={2} style={styles.description}>
            {description}
            </Text>
          ) : null}
        </View>
      </View>
    </Link>
  );
};
