import React, { useMemo } from 'react';
import { merge } from '@cliqz/component-styles';
import { LogoComponent, Result, t, ImageRendererComponent, openLink } from '@cliqz/component-types';
import { SelecteableSnippet, Snippet, SnippetStyles, styles as baseSnippetStyles } from './snippet';
export { SnippetStyles } from './snippet';

export { baseSnippetStyles as styles };

export const GenericSnippet = ({
  result,
  resultIndex,
  LogoComponent,
  ImageRendererComponent,
  t,
  onPress,
  onLongPress,
  styles: extendedStyles,
  isSelectable = true,
  type,
}: {
  result: Result,
  resultIndex?: number,
  LogoComponent: LogoComponent,
  ImageRendererComponent: ImageRendererComponent,
  t: t,
  onPress?: openLink,
  onLongPress?: openLink,
  styles?: Partial<SnippetStyles>;
  isSelectable?: boolean,
  type: string
}) => {
  const styles = useMemo(() => merge(baseSnippetStyles, extendedStyles), [extendedStyles])
  const SnippetComponent = useMemo(() => isSelectable ? SelecteableSnippet : Snippet, [isSelectable])

  return (
    <SnippetComponent
      result={result}
      type={type}
      LogoComponent={LogoComponent}
      ImageRendererComponent={ImageRendererComponent}
      onPress={onPress}
      onLongPress={onLongPress}
      t={t}
      styles={styles}
      resultIndex={resultIndex}
    />
  );
};
