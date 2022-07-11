import { TerminalService } from '..';
import { CommandState } from '../commandState';
import { HistoryParser } from './history';

describe('HistoryParser', () => {
  afterEach(() => {
    TerminalService.history.reset();
  });
  it('HistoryParser.test return false', () => {
    expect(HistoryParser.test('man history')).toBe(false);
  });
  it('HistoryParser.test return true', () => {
    expect(HistoryParser.test('history')).toBe(true);
  });
  it('HistoryParser.parse without flags', () => {
    expect(HistoryParser.parse('history').flags.length).toBe(0);
  });
  it('HistoryParser.parse with flag', () => {
    expect(HistoryParser.parse('history -flag').flags).toEqual([
      '-f',
      '-l',
      '-a',
      '-g',
    ]);
  });
  it('HistoryParser.parse with n', () => {
    expect(HistoryParser.parse('history 5').n).toBe(5);
  });
  it('HistoryParser.parse with -d', () => {
    expect(HistoryParser.parse('history -d 5').d).toBe(5);
  });
  it('HistoryParser.execute without flags', () => {
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = {};
    HistoryParser.execute(state);
    expect(state.output).toEqual(['1  command one', '2  command two']);
  });
  it('HistoryParser.execute with -c', () => {
    const spy = jest.spyOn(TerminalService.history, 'reset');
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = { flags: ['-c'] };
    HistoryParser.execute(state);
    expect(state.output).toEqual([]);
    expect(TerminalService.history.l).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
  it('HistoryParser.execute with n=1', () => {
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = { n: 1 };
    HistoryParser.execute(state);
    expect(state.output).toEqual(['2  command two']);
  });
  it('HistoryParser.execute with n > TerminalService.history.l', () => {
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = { n: 100 };
    HistoryParser.execute(state);
    expect(state.output).toEqual(['1  command one', '2  command two']);
  });
  it('HistoryParser.execute with -d 1', () => {
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = { d: 1 };
    HistoryParser.execute(state);
    expect(state.output).toEqual(['1  command two']);
  });
  it('HistoryParser.execute with -d > TerminalService.history.l', () => {
    TerminalService.parse('command one');
    TerminalService.parse('command two');
    const state = new CommandState();
    state.parsedData = { d: 100 };
    HistoryParser.execute(state);
    expect(state.output).toEqual(['1  command one', '2  command two']);
  });
});
