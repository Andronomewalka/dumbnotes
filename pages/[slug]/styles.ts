import styled from 'styled-components';

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
    list-style-type: disc;
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
