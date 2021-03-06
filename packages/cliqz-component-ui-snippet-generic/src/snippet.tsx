/* eslint-disable react/prop-types */
/*!
* Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import React, { useMemo, ComponentType, useCallback } from 'react';
import { Text, TextProps, View, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import { withSelectableResult, SelectableResultProps } from '@cliqz/component-ui-selectable-results';
import { Result, t, ImageRendererComponent, openLink, LogoComponent } from '@cliqz/component-types';
import { SnippetIcon } from './snippet-icon';
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


type WebTextProps = TextProps & {
  href?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  accessibilityRole: 'link';
};

const Anchor = TouchableWithoutFeedback as ComponentType<WebTextProps>;

const httpsLockWidth = 12;
const httpsLockMarginRight = 2;

export interface SnippetStyles {
  container: UniversalViewStyle
  containerSelected: UniversalViewStyle
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
  containerSelected: {
    backgroundColor: '#9999ff',
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

export const Snippet = (
  {
    type,
    resultIndex,
    LogoComponent,
    ImageRendererComponent,
    result,
    onPress,
    onLongPress,
    t,
    styles: extendedStyles,
    isActive,
  }:
  {
    type: string,
    resultIndex?: number,
    LogoComponent: LogoComponent,
    ImageRendererComponent: ImageRendererComponent,
    result: Result,
    onPress?: openLink,
    onLongPress?: openLink,
    t: t,
    styles?: Partial<SnippetStyles>
  } & SelectableResultProps
) => {
  const styles = useMemo(() => merge(baseStyles, extendedStyles), [extendedStyles]);
  const { title, friendlyUrl, description, url } = result;
  const titleLines = type === 'main' ? 2 : 1;
  const titleStyle = type === 'main' ? [styles.mainTitle] : [styles.subTitle];
  const isInHistory = isHistory(result);
  if (isInHistory) {
    titleStyle.push(styles.visitedTitle);
  }
  const onPressCallback = useCallback(() => onPress && onPress(result, { isHistory: isInHistory, type, index: resultIndex }), [result, onPress]);
  const onLongPressCallback = useCallback(() => onLongPress && onLongPress(result, { isHistory: isInHistory, type: result.type }), [result, onLongPress]);

  return (
    <Anchor accessibilityRole='link' href={url} onPress={onPressCallback} onLongPress={onLongPressCallback} >
      <View style={[styles.container, isActive ? styles.containerSelected : null]}>
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
    </Anchor>
  );
};

export const SelecteableSnippet = withSelectableResult(Snippet);
