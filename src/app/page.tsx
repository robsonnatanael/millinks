import Layout from '@/components/Layout';
import Header from '@/container/Home/Header';
import { data } from '@/data/mock';
import Nav from '@/container/Home/Nav';
import Footer from '@/components/Footer';
import { apiFetch } from '@/lib/api-client';
import { Linktree } from '@/@types/api';
import { logger } from '@/lib/logger';
import { ENDPOINTS } from '@/shared/utils/endpoints';

export default async function Home() {
  let navLinks = data.links;
  const revalidateTime = 60 * 5;

  try {
    const response = await apiFetch<Linktree>(ENDPOINTS.LINKTREES, {
      next: { revalidate: revalidateTime },
    });
    navLinks = response.data;
  } catch (error) {
    logger.error('Falha ao carregar linktrees da API.', error);
  }

  return (
    <Layout>
      <Header data={data} />
      <Nav links={navLinks} />
      <Footer />
    </Layout>
  );
}
