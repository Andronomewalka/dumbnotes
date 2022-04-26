import React, { FC, useState, useRef, useCallback, SyntheticEvent } from 'react';
import {
  SearchBarFormWrapper,
  SearchBarInputIcon,
  SearchBarInputWrapper,
} from './styles';
import { SearchBarInputType } from './types';
import { SearchIcon } from './SearchIcon';
import { useDebounce } from 'hooks/useDebounce';

export const SearchBarInput: FC<SearchBarInputType> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState('');

  useDebounce(
    useCallback(() => {
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }, []),
    input,
    350
  );

  const onFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <SearchBarFormWrapper ref={formRef} onSubmit={onFormSubmit}>
      <SearchBarInputWrapper
        type='input'
        placeholder='Search'
        spellCheck='true'
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <SearchBarInputIcon>
        <SearchIcon />
      </SearchBarInputIcon>
    </SearchBarFormWrapper>
  );
};
