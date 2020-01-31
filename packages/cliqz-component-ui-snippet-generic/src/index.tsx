import React, { useMemo } from 'react';
import { merge } from '@cliqz/component-styles';
import { SelecteableSnippet, Snippet, SnippetStyles, styles as baseSnippetStyles } from './snippet';
import { LogoComponent, Result, t, ImageRendererComponent, openLink } from './types';
export * from './types';
export { SnippetStyles } from './snippet';

export { baseSnippetStyles as styles };

export const GenericSnippet = ({
  result,
  LogoComponent,
  ImageRendererComponent,
  t,
  openLink,
  styles: extendedStyles,
  isUrlsSelecable = true,
  type,
}: {
  result: Result,
  LogoComponent: LogoComponent,
  ImageRendererComponent: ImageRendererComponent,
  t: t,
  openLink: openLink,
  styles?: Partial<SnippetStyles>;
  isUrlsSelecable?: boolean,
  type: string
}) => {
  const styles = useMemo(() => merge(baseSnippetStyles, extendedStyles), [extendedStyles])
  const SnippetComponent = useMemo(() => isUrlsSelecable ? SelecteableSnippet : Snippet, [isUrlsSelecable])

  return (
    <SnippetComponent
      result={result}
      type={type}
      LogoComponent={LogoComponent}
      ImageRendererComponent={ImageRendererComponent}
      openLink={openLink}
      t={t}
      styles={styles}
    />
  );
};
