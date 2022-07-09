import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { adjustInput, AutosizeInput } from './index';

describe('AutosizeInput', () => {
  it('should render correctly', () => {
    const { container } = render(<AutosizeInput />);
    expect(container).toMatchSnapshot();
  });
  it('should call onChange when input is changed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<AutosizeInput onChange={onChange} />);
    const input = getByTestId('autosize-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
  });
  it('should call adjustInput when input is changed', () => {
    const { getByTestId } = render(<AutosizeInput />);
    const input = getByTestId('autosize-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.style.width).toBe('4ch');
  });
  it('should not call adjustInput if input is not defined', () => {
    expect(adjustInput(undefined)).toBeUndefined();
  });
  it('should call onInput when input is changed', () => {
    const onInput = jest.fn();
    const { getByTestId } = render(<AutosizeInput onInput={onInput} />);
    const input = getByTestId('autosize-input');
    fireEvent.input(input, { target: { value: 'test' } });
    expect(onInput).toHaveBeenCalled();
  });
});
