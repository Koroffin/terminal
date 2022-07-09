import { TerminalHistory } from './history';

describe('TerminalHistory', () => {
  afterEach(() => {
    TerminalHistory.reset();
  });
  it('TerminalHistory.add should work', () => {
    TerminalHistory.add('some command');
    expect(TerminalHistory.history).toEqual(['some command']);
  });
  it('TerminalHistory.l should work', () => {
    TerminalHistory.add('some command');
    expect(TerminalHistory.l).toEqual(1);
  });
  it('TerminalHistory.reset should work', () => {
    TerminalHistory.add('some command');
    TerminalHistory.add('another command');
    TerminalHistory.removeByIdx(0);
    expect(TerminalHistory.history).toEqual(['another command']);
  });
  it('TerminalHistory.reset should work', () => {
    TerminalHistory.add('some command');
    TerminalHistory.reset();
    expect(TerminalHistory.l).toBe(0);
  });
  it('TerminalHistory.prev and HistoryParser.next should work', () => {
    TerminalHistory.add('some command');
    TerminalHistory.add('another command');
    expect(TerminalHistory.prev()).toBe('another command');
    expect(TerminalHistory.prev()).toBe('some command');
    expect(TerminalHistory.next()).toBe('another command');
  });
  it('TerminalHistory.prev should stop, if pointer is already a zero', () => {
    TerminalHistory.add('some command');
    TerminalHistory.add('another command');
    expect(TerminalHistory.prev()).toBe('another command');
    expect(TerminalHistory.prev()).toBe('some command');
    expect(TerminalHistory.prev()).toBe('some command');
  });
  it('TerminalHistory.next should return an empty string, if pointer is equal to TerminalHistory.history.length', () => {
    TerminalHistory.add('some command');
    TerminalHistory.add('another command');
    expect(TerminalHistory.prev()).toBe('another command');
    expect(TerminalHistory.prev()).toBe('some command');
    expect(TerminalHistory.next()).toBe('another command');
    expect(TerminalHistory.next()).toBe('');
  });
});
