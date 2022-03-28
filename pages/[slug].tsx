import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import styled from 'styled-components';
import { getPost, getPosts } from 'blog-app-shared';
import { Mdx } from 'components/Mdx';

const DriveItemPath: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  fallback,
  error,
}) => {
  let url = '';
  let prefetchedData = null;
  if (fallback) {
    url = Object.keys(fallback)[0];
    prefetchedData = fallback[Object.keys(fallback)[0]];
  }

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={name} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>
        {!!error ? error : <Mdx url={url} prefetchedData={prefetchedData} />}
      </Wrapper>
    </>
  );
};

export default DriveItemPath;

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
