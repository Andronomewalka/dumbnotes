import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import { Mdx } from 'components/Mdx';
import { client } from 'utils/client';

const SlugPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  url,
  prefetchedData,
  lastUpdated,
  error,
}) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={name} />
      </Head>
      {prefetchedData ? (
        <Mdx url={url} prefetchedData={prefetchedData} prefetchedUpdated={lastUpdated} />
      ) : (
        <span>{error}</span>
      )}
    </>
  );
};

export default SlugPage;

export async function getStaticProps(ctx: any) {
  try {
    const slug = ctx.params.slug;
    const response = await client.get(`/posts/${slug}`);
    const payload = response.data;
    const sourceRaw = payload.data.content;
    const lastUpdated = payload.data.date;
    const mdxSource = await serialize(sourceRaw, {
      mdxOptions: { rehypePlugins: [rehypeHighlight] },
    });
    return {
      props: {
        name: payload.data.name,
        url: `/posts/${slug}`,
        prefetchedData: mdxSource,
        lastUpdated: lastUpdated,
        error: payload.error,
      },
      revalidate: 86400, // once a day, if something with on-demand revalidation fucked up
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
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
