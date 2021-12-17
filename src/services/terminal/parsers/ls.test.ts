import { TerminalService } from '..';
import { CommandState } from '../commandState';
import { LsParser } from './ls';

describe('LsParser', () => {
  afterEach(() => {
    TerminalService.reset();
  });
  it('LsParser.test return false', () => {
    expect(LsParser.test('man history')).toBe(false);
  });
  it('LsParser.test return true', () => {
    expect(LsParser.test('ls')).toBe(true);
  });
  it('LsParser.execute', () => {
    TerminalService.init();
    const state = new CommandState();
    LsParser.execute(state);
    expect(state.output).toEqual(TerminalService.files.ls());
  });
});
