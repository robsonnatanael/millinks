import Head from 'next/head';

type SEOProps = {
  title?: string,
  description?: string,
}

const SEO = (props: SEOProps) => {
  const { title = '', description = '' } = props;

  return (
    <Head>
      <meta
        name="keywords"
        content="links, rede social, perfil"
      />
      <meta
        charSet="utf-8"
      />
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta
        httpEquiv="Content-Language"
        content="pt-br"
      />
      <title>
        {title} {title && '-'} Millinks
      </title>
      <meta
        name="description"
        content={description}
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
    </Head>
  );
};

export default SEO;
