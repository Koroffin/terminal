import { mount } from 'enzyme';
import React from 'react';
import { AutosizeInput } from '.';

describe('<AutosizeInput />', () => {
  it('<AutosizeInput /> default render', () => {
    const component = mount(<AutosizeInput />);
    expect(component.find('input').length).toBe(1);
  });
  it('<AutosizeInput /> onChange and onInput hooks work', () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const component = mount(
      <AutosizeInput onChange={onChange} onInput={onInput} />
    );
    const input = component.find('input');
    input.simulate('change');
    input.simulate('input');
    expect(onChange).toBeCalledTimes(1);
    expect(onInput).toBeCalledTimes(1);
  });
  it('<AutosizeInput /> resize input on input and change', () => {
    const component = mount(<AutosizeInput />);
    const input = component.find('input');
    const target = input.getDOMNode() as HTMLInputElement;
    target.value = '123';
    input.simulate('change', { target });
    expect(target.style.width).toBe('3ch');
    target.value = '1234';
    input.simulate('input', { target });
    expect(target.style.width).toBe('4ch');
  });
});
