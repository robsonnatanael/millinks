import SEO from '@src/common/SEO';
import type { NextPage } from 'next';
import Footer from '@src/components/Footer';
import Layout from '@src/components/Layout';
import Header from '@src/container/Home/Header';
import { data } from "pages/api/mock";
import Nav from '@src/container/Home/Nav';

const Home: NextPage = () => {
  const { page, links } = data;

  return (
    <Layout>
      <SEO />
      <Header data={data}/>
      <Nav links={links} />
      <Footer />
    </Layout>
  );
};

export default Home;
