import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name='description' content='not found' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>
        <Image src='/wat_kitty.png' width={400} height={400} alt='wat kitty' />
        <span>Похоже такой заметки пока не существует, но вот котик</span>
      </Wrapper>
    </>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 500px;
  margin: auto;
  font-size: 12pt;
  line-height: 1.7;
`;
