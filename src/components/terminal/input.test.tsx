import { mount } from 'enzyme';
import React from 'react';
import { flush } from 'Utils/flush';
import { Input } from './input';
import { Caret } from './styles/caret';
import { InputWrapper } from './styles/inputWrapper';

describe('<Terminal /> <Input />', () => {
  it('<Terminal /> <Input /> default render', async () => {
    const component = mount(<Input execute={() => {}} />);
    expect(component.find(InputWrapper).length).toBe(1);
  });
  it('<Terminal /> <Input /> display caret on focus', () => {
    const component = mount(<Input execute={() => {}} />);
    component.find(InputWrapper).simulate('focus');
    expect(component.find(Caret).length).toBe(1);
  });
});
