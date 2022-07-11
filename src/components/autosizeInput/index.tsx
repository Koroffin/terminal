import React, { useCallback } from 'react';
import { Input } from './styles/input';

export const adjustInput = (input: HTMLInputElement) => {
  if (!input) {
    return;
  }
  input.style.width = `${input.value.length}ch`;
};

export const AutosizeInput: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props: React.HTMLProps<HTMLInputElement>
) => {
  const {
    onInput,
    onFocus,
    onBlur,
    onSelect,
    autoFocus,
    className,
    onClick,
    onKeyDown,
    onChange,
  } = props;

  const onInputFn = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      adjustInput(evt.currentTarget);
      onInput?.(evt);
    },
    [onInput]
  );
  const onChangeFn = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      adjustInput(evt.currentTarget);
      onChange?.(evt);
    },
    [onChange]
  );

  return (
    <Input
      onFocus={onFocus}
      onBlur={onBlur}
      onSelect={onSelect}
      autoFocus={autoFocus}
      className={className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onInput={onInputFn}
      onChange={onChangeFn}
      data-autotest-id="autosize-input"
    />
  );
};
