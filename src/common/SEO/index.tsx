import Head from 'next/head';

import { SEOProps } from './props';

const SEO = (props: SEOProps) => {
  const { title, description, keywords } = props.seo;

  const titleFormatted = title.length > 0 ? `${title} | Millinks` : 'Millinks';

  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta httpEquiv="Content-Language" content="pt-BR" />
      <title>{titleFormatted}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};

export default SEO;
