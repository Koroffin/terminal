import { CommandState } from 'Services/terminal/commandState';
import { manHash, ManParser, MAN_ERROR } from './man';

describe('ManParser', () => {
  it('ManParser.test return false', () => {
    expect(ManParser.test('history')).toBe(false);
  });
  it('ManParser.test return true', () => {
    expect(ManParser.test('man history')).toBe(true);
  });
  it('ManParser.parse success', () => {
    expect(ManParser.parse('man history').name).toBe('history');
  });
  it('ManParser.parse error', () => {
    expect(ManParser.parse('man').name).toBe('ERROR');
  });
  it('ManParser.execute success', () => {
    const state = new CommandState();
    state.parsedData = { name: 'history' };
    ManParser.execute(state);
    expect(state.output).toEqual(manHash.history);
  });
  it('ManParser.execute error', () => {
    const state = new CommandState();
    state.parsedData = { name: 'ERROR' };
    ManParser.execute(state);
    expect(state.output).toEqual(MAN_ERROR);
  });
});
