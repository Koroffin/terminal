import { mount } from 'enzyme';
import React from 'react';
import { TerminalService } from 'Services/terminal';
import { Terminal } from '.';
import { Input } from './input';
import { Block } from './styles/block';

const mockParseOutput = ['123', '111', '222', '333'];
describe('<Terminal />', () => {
  let originalParse: typeof TerminalService.parse;
  beforeAll(() => {
    originalParse = TerminalService.parse;
    TerminalService.parse = () => mockParseOutput;
  });
  afterAll(() => (TerminalService.parse = originalParse));

  it('<Terminal /> TerminalService.parse should be called when execute', () => {
    const component = mount(<Terminal />);
    const spyExecute = jest.spyOn(TerminalService, 'parse');
    component.find(Input).invoke('execute')('sudo');
    expect(spyExecute).toBeCalledTimes(1);
  });
  it('<Terminal /> TerminalService.parse output should be rendered', () => {
    const component = mount(<Terminal />);
    component.find(Input).invoke('execute')('sudo');
    expect(component.find(Block).length).toBe(mockParseOutput.length + 2);
  });
});
