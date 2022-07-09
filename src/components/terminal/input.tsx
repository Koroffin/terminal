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
      const event = new Event('input', { bubbles: true });
      target.dispatchEvent(event);
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
        if (key === 'Tab') {
          evt.preventDefault();
          const pipeArr = target.value.split('|');
          const lastPipe = pipeArr.pop();
          const lastPipeArr = lastPipe.split(' ');
          const lastPipeCommand = lastPipeArr.pop();
          const [ possibleValue ] = TerminalService.autocomplete(lastPipeCommand);
          if (possibleValue !== undefined) {
            lastPipeArr.push(possibleValue);
            pipeArr.push(lastPipeArr.join(' '));
            requestAnimationFrame(() =>
              updateInputContent(target, `${pipeArr.join('|')} `)
            );
          }
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
        {isFocused && (
          <Caret position={caretPosition} data-autotest-id="caret" />
        )}
      </Flex>
    </Block>
  );
};
