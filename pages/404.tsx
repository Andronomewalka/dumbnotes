import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import { device } from 'utils/media';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name='description' content='not found' />
      </Head>
      <Wrapper>
        <ImageContainer>
          <Image src='/wat_kitty.png' layout='fill' objectFit='contain' alt='wat kitty' />
        </ImageContainer>
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
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 0 1.25rem 1.25rem;
  font-size: 12pt;
  line-height: 1.7;

  @media ${device.mobile} {
    max-width: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media ${device.mobile} {
    height: 300px;
  }
`;
