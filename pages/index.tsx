import Head from 'next/head';
import Layout from '../components/layout';
import { getHomeContent } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>


      </Layout>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> 
    </div>
  )
}

export async function getStaticProps({id = 2}) {
  const homeContent = await getHomeContent(id);
  return {
    props: { homeContent }
  }
}