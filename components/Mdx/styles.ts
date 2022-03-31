import styled from 'styled-components';
import { PlainCardBackgroundColor } from './types';

export const MdxWrapper = styled.div`
  line-height: 1.7;
`;

export const PlainCardWrapper = styled.div<{
  background: PlainCardBackgroundColor;
}>`
  display: inline-block;
  padding: 0.25rem 1.5rem;
  border-radius: 10px;
  background: ${(props) => props.theme.palette[props.background]};
`;

export const PlainLink = styled.a`
  text-decoration: none;

  :hover {
    color: ${(props) => props.theme.palette.primary};
  }
`;
