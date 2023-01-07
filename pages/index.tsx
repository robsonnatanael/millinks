import type { NextPage } from 'next';

import SEO from '@src/common/SEO';
import Footer from '@src/components/Footer';
import Layout from '@src/components/Layout';
import Header from '@src/container/Home/Header';
import Nav from '@src/container/Home/Nav';
import { data } from 'pages/api/mock';

const Home: NextPage = () => {
  const { links } = data;

  return (
    <Layout>
      <SEO />
      <Header data={data} />
      <Nav links={links} />
      <Footer />
    </Layout>
  );
};

export default Home;
