import React, { useCallback, useState } from 'react';
import { TerminalService } from 'Services/terminal';
import { Flex } from 'Components/flex';
import { Block } from './styles/block';
import { Caret } from './styles/caret';
import { InputWrapper } from './styles/inputWrapper';

interface InputProps {
  execute(str: string): void;
}

export const Input: React.FC<InputProps> = ({ execute }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const updateCaretPosition = useCallback(
    (input: HTMLInputElement) => {
      setCaretPosition(input.selectionEnd);
    },
    [setCaretPosition]
  );
  const updateInputContent = useCallback(
    (target: HTMLInputElement, newValue: string) => {
      const caretPos = newValue.length;
      target.value = newValue;
      target.setSelectionRange(caretPos, caretPos);
    },
    []
  );

  const onFocus = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      const { target } = evt;
      if (target instanceof HTMLInputElement) {
        updateCaretPosition(target);
      }
      setIsFocused(true);
    },
    [setIsFocused, updateCaretPosition]
  );
  const onBlur = useCallback(() => setIsFocused(false), [setIsFocused]);

  const onInputClick = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      const { target } = evt;
      if (target instanceof HTMLInputElement) {
        updateCaretPosition(target);
      }
    },
    [updateCaretPosition]
  );

  const onKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      const { target, key } = evt;
      if (target instanceof HTMLInputElement) {
        if (key === 'Enter') {
          execute(target.value);
          target.value = '';
        }
        if (key === 'ArrowUp') {
          requestAnimationFrame(() =>
            updateInputContent(target, TerminalService.history.prev())
          );
        }
        if (key === 'ArrowDown') {
          requestAnimationFrame(() =>
            updateInputContent(target, TerminalService.history.next())
          );
        }
        requestAnimationFrame(() => updateCaretPosition(target));
      }
    },
    [updateCaretPosition, execute, updateInputContent]
  );

  return (
    <Block>
      <Flex>
        $&nbsp;
        <InputWrapper
          key="input"
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onInputClick}
          onKeyDown={onKeyDown}
          autoFocus
        />
        {isFocused && <Caret position={caretPosition} />}
      </Flex>
    </Block>
  );
};
