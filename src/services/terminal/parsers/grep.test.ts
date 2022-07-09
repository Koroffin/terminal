import { CommandState } from '../commandState';
import { GrepParser, NO_PATTERN_ERROR } from './grep';

describe('GrepParser', () => {
  it('GrepParser.test return true', () => {
    expect(GrepParser.test('grep history')).toBe(true);
  });
  it('GrepParser.test return false', () => {
    expect(GrepParser.test('sudo man history')).toBe(false);
  });
  it('GrepParser.parse should work', () => {
    expect(GrepParser.parse('grep').pattern).toBe(undefined);
    expect(GrepParser.parse('grep history').pattern).toBe('history');
    expect(GrepParser.parse('grep "history 3"').pattern).toBe('history 3');
  });
  it('GrepParser.execute correctly', () => {
    const state = new CommandState();
    state.output = ['sudo', 'history', 'some command'];
    state.parsedData = {
      pattern: 'histo',
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['history']);
  });
  it('GrepParser.execute incorrectly', () => {
    const state = new CommandState();
    state.output = ['sudo', 'history', 'some command'];
    state.parsedData = {
      pattern: undefined,
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(NO_PATTERN_ERROR);
  });
});
