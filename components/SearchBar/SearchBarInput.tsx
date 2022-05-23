import React, {
  FC,
  useState,
  useRef,
  useCallback,
  SyntheticEvent,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useDebounce } from 'hooks/useDebounce';
import {
  SearchBarFormWrapper,
  SearchBarInputIcon,
  SearchBarInputWrapper,
} from './styles';
import { SearchBarInputType } from './types';
import { SearchIcon } from './SearchIcon';

export const SearchBarInput: FC<SearchBarInputType> = ({ onSubmit }) => {
  const router = useRouter();
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

  useEffect(() => {
    const onRouteChangeComplete = () => {
      setInput('');
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => router.events.off('routeChangeComplete', onRouteChangeComplete);
  }, [router.events]);

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
