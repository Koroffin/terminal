import { mount } from 'enzyme';
import React from 'react';
import { TerminalService } from 'Services/terminal';
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
  it('<Terminal /> <Input /> up and down arrows work', async () => {
    const component = mount(<Input execute={() => {}} />);
    const input = component.find('input').getDOMNode();
    const spyPrev = jest.spyOn(TerminalService.history, 'prev');
    const spyNext = jest.spyOn(TerminalService.history, 'next');
    component
      .find(InputWrapper)
      .simulate('keyDown', { target: input, key: 'ArrowUp' });
    await flush();
    expect(spyPrev).toBeCalledTimes(1);
    component
      .find(InputWrapper)
      .simulate('keyDown', { target: input, key: 'ArrowDown' });
    await flush();
    expect(spyNext).toBeCalledTimes(1);
  });
  it('<Terminal /> <Input /> execute on Enter', async () => {
    const execute = jest.fn();
    const component = mount(<Input execute={execute} />);
    const input = component.find('input').getDOMNode();
    component
      .find(InputWrapper)
      .simulate('keyDown', { target: input, key: 'Enter' });
    expect(execute).toBeCalledTimes(1);
  });
});
