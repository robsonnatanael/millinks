'use client';

import Layout from '@/components/Layout';
import Header from '@/container/Home/Header';
import { data } from './api/mock';
import Nav from '@/container/Home/Nav';
import Footer from '@/components/Footer';

export default function Home() {
  const { links } = data;

  return (
    <Layout>
      <Header data={data} />
      <Nav links={links} />
      <Footer />
    </Layout>
  );
}
