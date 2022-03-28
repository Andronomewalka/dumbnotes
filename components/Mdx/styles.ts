import styled, { css } from 'styled-components';
import { MdxBoxBaseType, PlainCardBackgroundColor } from './types';

export const MdxWrapper = styled.div`
  line-height: 1.7;
`;

const MdxBoxBase = styled.div<MdxBoxBaseType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
`;

export const PlainCardWrapper = styled.div<{
  background: PlainCardBackgroundColor;
}>`
  display: inline-block;
  padding: 0.25rem 1.5rem;
  border-radius: 10px;
  background: ${(props) => props.theme.palette[props.background]};
`;

export const LinkWrapper = styled.a`
  text-decoration: none;

  :hover {
    color: ${(props) => props.theme.palette.primary};
  }
`;
