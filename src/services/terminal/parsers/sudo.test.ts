import { CommandState } from '../commandState';
import { SudoParser, SUDO_ERROR } from './sudo';

describe('SudoParser', () => {
  it('SudoParser.test return false', () => {
    expect(SudoParser.test('man history')).toBe(false);
  });
  it('SudoParser.test return true', () => {
    expect(SudoParser.test('sudo man history')).toBe(true);
  });
  it('SudoParser.execute', () => {
    const state = new CommandState();
    SudoParser.execute(state);
    expect(state.output).toEqual(SUDO_ERROR);
  });
});
