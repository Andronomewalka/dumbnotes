import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Mdx } from 'components/Mdx';
import { client } from 'utils/client';

const SlugPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  fallback,
  error,
}) => {
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
      </Head>
      <Wrapper as={motion.article} initial='initial' animate='animate' exit='exit'>
        {content}
      </Wrapper>
    </>
  );
};

export default SlugPage;

const Wrapper = styled.article`
  line-height: 1.7;
  padding: 0 1.25rem 1.25rem;
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
    if (e?.response?.status === 404) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
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
