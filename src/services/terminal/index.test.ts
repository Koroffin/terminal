import { TerminalService } from '.';
import { CommandState } from './commandState';
import { SudoParser } from './parsers/sudo';

describe('TerminalService', () => {
  afterEach(() => {
    TerminalService.reset();
  });
  it('TerminalService.parse should work', () => {
    const state = new CommandState();
    SudoParser.execute(state);
    expect(TerminalService.parse('sudo')).toEqual(state.output);
  });
  it('TerminalService.init should add files', () => {
    const spyFiles = jest.spyOn(TerminalService.files, 'generateDefaultTree');
    TerminalService.init();
    expect(spyFiles).toBeCalledTimes(1);
  });
  it('TerminalService.reset should work', () => {
    const spyFiles = jest.spyOn(TerminalService.files, 'reset');
    const spyHistory = jest.spyOn(TerminalService.history, 'reset');
    TerminalService.reset();
    expect(spyFiles).toBeCalledTimes(1);
    expect(spyHistory).toBeCalledTimes(1);
  });
  it('TerminalService.autocomplete should work', () => {
    const res = TerminalService.autocomplete('s');
    expect(res).toEqual(['sudo']);
  });
});
