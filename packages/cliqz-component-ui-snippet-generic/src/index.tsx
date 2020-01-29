import React, { useMemo } from 'react';
import { View } from 'react-native';
import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import { SelecteableSnippet, Snippet, SnippetStyles, styles as baseSnippetStyles } from './snippet';
import { SnippetList } from './snippet-list';
import { LogoComponent, Result, t, ImageRendererComponent, NewsComponent, openLink } from './types';
export * from './types';

export interface GenericSnippetStyle {
  container: UniversalViewStyle,
  wrapper: UniversalViewStyle,
  mainSnippetStyle: Partial<SnippetStyles>,
  urlsSnippetStyle: Partial<SnippetStyles>,
}

const baseStyles: GenericSnippetStyle = {
  container: {
    flexDirection: 'column',
    marginVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 9,
  },
  wrapper: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  mainSnippetStyle: baseSnippetStyles,
  urlsSnippetStyle: baseSnippetStyles,
}

export { baseStyles as styles };

export const GenericSnippet = ({
  result,
  LogoComponent,
  ImageRendererComponent,
  t,
  openLink,
  styles: extendedStyles,
  NewsComponent,
  isUrlsSelecable = true,
}: {
  result: Result,
  LogoComponent: LogoComponent,
  ImageRendererComponent: ImageRendererComponent,
  t: t,
  openLink: openLink,
  styles?: Partial<GenericSnippetStyle>;
  NewsComponent?: NewsComponent,
  isUrlsSelecable?: boolean
}) => {
  const styles = useMemo(() => ({
    ...merge(baseStyles, extendedStyles),
    mainSnippetStyle: merge(baseStyles.mainSnippetStyle, extendedStyles ? extendedStyles.mainSnippetStyle : undefined),
    urlsSnippetStyle: merge(baseStyles.urlsSnippetStyle, extendedStyles ? extendedStyles.urlsSnippetStyle : undefined),
  }), [extendedStyles]);

  const news = useMemo(() => {
    const deepResults = result.data.deepResults || []
    return deepResults.find(
      r => r.type === 'news' || r.type === 'top-news',
    );
  }, [result.data.deepResults]);

  const SnippetComponent = useMemo(() => isUrlsSelecable ? SelecteableSnippet : Snippet, [isUrlsSelecable])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <SelecteableSnippet
          result={result}
          type="main"
          LogoComponent={LogoComponent}
          ImageRendererComponent={ImageRendererComponent}
          openLink={openLink}
          t={t}
          styles={styles.mainSnippetStyle}
        />
        {(result.urls || []).length > 0 && (
          <SnippetList
            limit={3}
            expandStep={5}
            ImageRendererComponent={ImageRendererComponent}
            t={t}
            list={(result.urls || []).map(snippet => (
              <SnippetComponent
                key={snippet.url}
                result={snippet}
                LogoComponent={LogoComponent}
                ImageRendererComponent={ImageRendererComponent}
                openLink={openLink}
                t={t}
                type="history"
                styles={styles.urlsSnippetStyle}
              />
            ))}
          />
        )}
        {NewsComponent && news && (
          <NewsComponent news={news} />
        )}
      </View>
    </View>
  );
};
