import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

const ServerErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>500</title>
        <meta name='description' content='internal server error' />
      </Head>
      <Wrapper>
        <Image src='/repair_kitty.png' width={400} height={400} alt='repair kitty' />
        <span>Ох, что-то пошло не так, чиним</span>
      </Wrapper>
    </>
  );
};

export default ServerErrorPage;

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
