import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { getPost, getPosts } from 'blog-app-shared';
import { Mdx } from 'components/Mdx';

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
  width: 100%;
  padding: 1rem;
`;

export async function getStaticProps(context: any) {
  try {
    const path = context.params.slug;
    const response = await getPost(path);
    const sourceRaw = response.data.content;
    const mdxSource = await serialize(sourceRaw);
    return {
      props: {
        name: response.data.name,
        fallback: {
          [`/api/posts/${path}`]: mdxSource,
        },
        error: response.error,
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
  const postPathes = await getPosts();
  return {
    paths: postPathes.data.map((cur) => {
      return {
        params: {
          slug: cur.path,
        },
      };
    }),
    fallback: 'blocking',
  };
}
