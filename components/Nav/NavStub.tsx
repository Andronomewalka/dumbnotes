import React, { FC } from 'react';
import { NavStubItem } from './styles';

const arr = new Array(5).fill(null);

export const NavStub: FC = () => {
  return (
    <>
      {arr.map((_, i) => (
        <NavStubItem number={i} key={i} />
      ))}
    </>
  );
};
