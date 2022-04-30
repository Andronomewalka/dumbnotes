import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import rehypeHighlight from 'rehype-highlight';
import { Mdx } from 'components/Mdx';
import { useStaggerAnimation } from 'hooks/useStaggerAnimation';
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

  const applyAnimations = useStaggerAnimation();

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={name} />
      </Head>
      <SlugContentWrapper
        as={motion.article}
        initial={applyAnimations ? 'initial' : 'animate'}
        animate='animate'
        exit={applyAnimations ? 'exit' : ''}
      >
        {content}
      </SlugContentWrapper>
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
    const mdxSource = await serialize(sourceRaw, {
      mdxOptions: { rehypePlugins: [rehypeHighlight] },
    });
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

// customize md components
export const SlugContentWrapper = styled.article`
  line-height: 1.7;
  padding: 0 1.25rem 1.25rem;

  ul,
  ol {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  ul li::marker {
    color: ${(props) => props.theme.palette.accent};
    font-size: 1.5em;
  }

  ul {
    list-style: disc;
  }

  pre {
    margin: 1.35rem 0;
  }

  /* select only inline code (multiline is styled by rehype-highlight)*/
  *:not(pre) > code {
    padding: 0.2rem 0.35rem;
    border-radius: ${(props) => props.theme.borderRadius};
    background: ${(props) => props.theme.palette.gray2};
    font-family: Consolas, monospace;
  }

  /* multiline code container */
  .hljs {
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;
