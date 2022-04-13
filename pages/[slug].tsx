import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Mdx } from 'components/Mdx';
import { client } from 'utils/client';

const SlugPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  fallback,
  error,
}) => {
  const router = useRouter();

  let content = <span>{error}</span>;
  if (fallback) {
    const url = Object.keys(fallback)[0];
    const prefetchedData = fallback[url];
    content = <Mdx url={url} prefetchedData={prefetchedData} />;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={name} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Wrapper
          as={motion.section}
          initial='initial'
          animate='animate'
          exit={{ opacity: 0 }}
          key={router.asPath}
        >
          {content}
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

export default SlugPage;

const Wrapper = styled.section`
  display: inline-block;
  height: 100%;
  width: 100%;
  padding: 1rem;
  line-height: 1.7;
`;

export async function getStaticProps(ctx: any) {
  try {
    const slug = ctx.params.slug;
    const response = await client.get(`/posts/${slug}`);
    const payload = response.data;
    const sourceRaw = payload.data.content;
    const mdxSource = await serialize(sourceRaw);
    return {
      props: {
        name: payload.data.name,
        fallback: {
          [`/posts/${slug}`]: mdxSource,
        },
        error: payload.error,
      },
      revalidate: 86400, // once a day, if something with on-demand revalidation fucked up
    };
  } catch (e: any) {
    return {
      props: {
        error: e + '',
      },
      revalidate: 86400,
    };
  }
}

export async function getStaticPaths() {
  const response = await client.get('/posts?exclude=["name", "content"]');
  const payload = response.data;
  return {
    paths: payload.data.map((cur: { id: string; path: string }) => {
      return {
        params: {
          slug: cur.path,
        },
      };
    }),
    fallback: 'blocking',
  };
}
