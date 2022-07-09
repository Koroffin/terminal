//write tests
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './input';
import { TerminalService } from 'Services/terminal';
import { act } from 'react-dom/test-utils';

describe('Input', () => {
  it('should render correctly', () => {
    const { container } = render(<Input execute={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it('should call execute when Enter key is pressed', () => {
    const execute = jest.fn();
    const { getByTestId } = render(<Input execute={execute} />);
    const input = getByTestId('autosize-input');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(execute).toHaveBeenCalled();
  });
  it('should call TerminalService.history.prev when ArrowUp key is pressed', () => {
    const spyOnPrev = jest.spyOn(TerminalService.history, 'prev');
    const { getByTestId } = render(<Input execute={jest.fn()} />);
    const input = getByTestId('autosize-input');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(spyOnPrev).toHaveBeenCalled();
  });
  it('should call TerminalService.history.next when ArrowDown key is pressed', () => {
    const spyOnNext = jest.spyOn(TerminalService.history, 'next');
    const { getByTestId } = render(<Input execute={jest.fn()} />);
    const input = getByTestId('autosize-input');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(spyOnNext).toHaveBeenCalled();
  });
  it('should render caret on focus', () => {
    const { getByTestId, queryByTestId } = render(
      <Input execute={jest.fn()} />
    );
    const input = getByTestId('autosize-input');
    act(() => {
      fireEvent.focus(input);
    });
    expect(queryByTestId('caret')).toBeDOMElement();
  });
  it('should hide caret on blur', () => {
    const { getByTestId, queryByTestId } = render(
      <Input execute={jest.fn()} />
    );
    const input = getByTestId('autosize-input');
    act(() => {
      fireEvent.focus(input);
    });
    act(() => {
      fireEvent.blur(input);
    });
    expect(queryByTestId('caret')).toBeNull();
  });
  it('input is focused by default', () => {
    const { getByTestId } = render(<Input execute={jest.fn()} />);
    const input = getByTestId('autosize-input');
    expect(input).toBeFocused();
  });
});
