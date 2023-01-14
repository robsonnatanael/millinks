import { FC } from 'react';

import Head from 'next/head';

import { SEOProps } from './props';

/**
 * For good indexing in search engines is recommended:
 * @param title title maximum of 60 characters
 * @param metaDescription maximum of 160 characters
 */

export const SEO: FC<SEOProps> = ({ seo }) => {
  const { title, metaDescription, metaKeywords = '' } = seo;

  const formattedTitle = title ? `${title} | Millinks` : 'Millinks';
  const formattedDescription =
    metaDescription && metaDescription.length > 160
      ? metaDescription.slice(0, 157) + '...'
      : metaDescription;

  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta httpEquiv="Content-Language" content="pt-BR" />
      <title>{formattedTitle}</title>
      {formattedDescription && (
        <meta name="description" content={formattedDescription} />
      )}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
    </Head>
  );
};
