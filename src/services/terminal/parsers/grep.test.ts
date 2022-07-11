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
  it('GrepParser -i should work', () => {
    const state = new CommandState();
    state.output = ['sudo', 'HiStOrY', 'some command'];
    state.parsedData = {
      pattern: 'hIsto',
      flags: ['-i'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['HiStOrY']);
  });
  it('GrepParser --ignore-case should work', () => {
    const state = new CommandState();
    state.output = ['sudo', 'HiStOrY', 'some command'];
    state.parsedData = {
      pattern: 'hIsto',
      flags: ['--ignore-case'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['HiStOrY']);
  });
  it('GrepParser -w should work', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: 'abc',
      flags: ['-w'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc', 'test abc', 'abc test', 'test abc test', 'test:abc']);
  });
  it('GrepParser --word-regexp should work', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: 'abc',
      flags: ['--word-regexp'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc', 'test abc', 'abc test', 'test abc test', 'test:abc']);
  });
  it('GrepParser -x should work', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: 'abc',
      flags: ['-x'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc']);
  });
  it('GrepParser --extended-regexp should work', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: 'abc',
      flags: ['--extended-regexp'],
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc']);
  });
  it('GrepParser should support ^', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: '^abc'
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc', 'abc test']);
  });
  it('GrepParser should support $', () => {
    const state = new CommandState();
    state.output = ['abc', 'test abc', 'abc test', 'test abc test', 'test:abc', '_abc'];
    state.parsedData = {
      pattern: 'abc$'
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc', 'test abc', 'test:abc', '_abc']);
  });
  it('GrepParser should support .', () => {
    const state = new CommandState();
    state.output = ['abc', 'ac', 'afc', 'a.c'];
    state.parsedData = {
      pattern: 'a.c'
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['abc', 'afc', 'a.c']);
  });
  it('GrepParser should support \\.', () => {
    const state = new CommandState();
    state.output = ['abc', 'ac', 'afc', 'a.c'];
    state.parsedData = {
      pattern: 'a\\.c'
    };
    GrepParser.execute(state);
    expect(state.output).toEqual(['a.c']);
  });
});
