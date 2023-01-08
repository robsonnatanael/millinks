import type { NextPage } from 'next';

import SEO from '@src/common/SEO';
import Footer from '@src/components/Footer';
import Layout from '@src/components/Layout';
import Header from '@src/container/Home/Header';
import Nav from '@src/container/Home/Nav';
import { data } from '@src/mock';

const Home: NextPage = () => {
  const { links } = data;

  const dataSEO = {
    title: '',
    description: '',
    keywords: 'links, rede social, perfil',
  };

  return (
    <Layout>
      <SEO seo={dataSEO} />
      <Header data={data} />
      <Nav links={links} />
      <Footer />
    </Layout>
  );
};

export default Home;
