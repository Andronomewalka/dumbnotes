import styled from 'styled-components';
import { device } from 'utils/media';

// customize md components
export const MdxArticleWrapper = styled.article<{ $stretch: boolean }>`
  width: 100%;
  height: ${(props) => (props.$stretch ? '100%' : 'auto')};
  max-width: ${(props) => (props.$stretch ? 'none' : '800px')};
  margin: ${(props) => (props.$stretch ? '0' : '0 auto')};
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
    color: #ccc;
    background: #2d2d2d;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 12pt;
    border-radius: ${(props) => props.theme.borderRadius};
    line-height: 1.5;

    @media ${device.mobile} {
      font-size: 11pt;
    }

    .hljs-keyword,
    .hljs-variable,
    .hljs-literal {
      color: #cc99cd;
    }

    .hljs-title,
    .hljs-number {
      color: #f08d49;
    }

    .class_,
    .language_ {
      color: #ccc;
    }

    .hljs-attr {
      color: #f8c555;
    }

    .hljs-string {
      color: #7ec699;
    }

    .hljs-comment {
      color: #999;
    }
  }
`;

export const PlainLink = styled.a`
  position: relative;
  color: ${(props) => props.theme.palette.blue};
  text-decoration: none;
  cursor: pointer;

  ::after {
    position: absolute;
    left: 50%;
    bottom: 0;
    content: '';
    width: 100%;
    height: 2px;
    border-radius: 50px;
    background: ${(props) => props.theme.palette.blue};
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  :hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

export const MdxSubtitleWrapper = styled.h2`
  position: relative;
  margin-block-start: 1.5em;
  margin-block-end: 0.5em;
  scroll-margin-top: 65px;
  font-size: 1.17em;

  ::before {
    position: absolute;
    top: 0;
    left: -20px;
    content: '#';
    text-decoration: underline;
    margin-right: 5px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  :hover {
    ::before {
      opacity: 1;
    }
  }

  @media ${device.mobile} {
    ::before {
      content: '';
    }
  }
`;

export const MdxInfoWrapper = styled.div`
  padding: 1.25rem;
  color: ${(props) => props.theme.palette.dark};
  background: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.shadow.focus};
  font-size: 11pt;
`;

export const MdxDisclaimerWrapper = styled.div`
  font-size: 10pt;
  color: ${(props) => props.theme.palette.gray};
`;

export const MdxSourcesWrapper = styled.ul`
  font-size: 12pt;
  color: ${(props) => props.theme.palette.gray};
  margin-top: 0;
  margin-bottom: 0;
`;

export const MdxImageWrapper = styled.div`
  span {
    position: unset !important;
  }

  img {
    position: unset !important;
    height: unset !important;
  }
`;
