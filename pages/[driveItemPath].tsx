import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { getDriveItem } from 'blog-app-shared';
import {
  loadDrivePathes,
  getDrivePathes,
  getDriveIdByPath,
  getRevalidateValue,
} from 'backend';
import { Mdx } from 'components/Mdx';
import { serializeMdx } from 'components/Mdx';

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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export async function getStaticProps(context: any) {
  try {
    const driveItemId = await getDriveIdByPath(context.params.driveItemPath);
    if (driveItemId) {
      const postResponse = await getDriveItem(driveItemId);
      const sourceRaw = postResponse.data.content;
      const mdxSource = await serializeMdx(sourceRaw);
      return {
        props: {
          name: postResponse.data.name,
          fallback: {
            [`/api/getDriveItem?id=${driveItemId}`]: mdxSource,
          },
          error: postResponse.error,
        },
        revalidate: getRevalidateValue(),
      };
    }
    throw 'no driveItemId found';
  } catch (e: any) {
    return {
      props: {
        error: e + '',
      },
      revalidate: getRevalidateValue(),
    };
  }
}

export async function getStaticPaths() {
  await loadDrivePathes();
  const cachedDrivePathes = await getDrivePathes();
  return {
    paths: cachedDrivePathes
      .filter((cur) => cur.path !== '--nav--')
      .map((cur) => {
        return {
          params: {
            driveItemPath: cur.path,
          },
        };
      }),
    fallback: 'blocking',
  };
}
