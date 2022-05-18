import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import { device } from 'utils/media';

const ServerErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>500</title>
        <meta name='description' content='internal server error' />
      </Head>
      <Wrapper>
        <ImageContainer>
          <Image
            src='/repair_kitty.png'
            layout='fill'
            objectFit='contain'
            alt='repair kitty'
          />
        </ImageContainer>
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
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 0 1.25rem 1.25rem;
  font-size: 12pt;
  line-height: 1.7;

  @media ${device.tablet} {
    max-width: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media ${device.tablet} {
    height: 300px;
  }
`;
