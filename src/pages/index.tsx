import { useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { useQuery } from '@apollo/client';
import { SEO } from '@src/common/SEO';
import { Footer } from '@src/components/Footer';
import Layout from '@src/components/Layout';
import { Header } from '@src/container/Home/Header';
import { Nav } from '@src/container/Home/Nav';
import { DataPage } from '@src/container/Home/props';
import { MILLINKS } from '@src/graphql/queries/MILLINKS';

const Home: NextPage = () => {
  const [dataPage, setDataPage] = useState<DataPage>();
  const { loading, error, data } = useQuery(MILLINKS);

  useEffect(() => {
    if (!loading && data.linktree) setDataPage(data.linktree.data.attributes);
  }, [loading, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !dataPage) {
    return <p>Erro!</p>;
  }

  return (
    <Layout>
      <SEO seo={dataPage.seo} />
      <Header
        title={dataPage.title}
        avatar={dataPage.avatar.photo.image.data.attributes.url}
      />
      <Nav links={dataPage.links} />
      <Footer footer={dataPage.footer} />
    </Layout>
  );
};

export default Home;
