import { TerminalService } from '..';
import { CommandState } from '../commandState';
import { LsParser } from './ls';

describe('LsParser', () => {
  beforeEach(() => {
    TerminalService.init();
  });
  afterEach(() => {
    TerminalService.reset();
    jest.clearAllMocks();
  });
  it('LsParser.test return false', () => {
    expect(LsParser.test('man history')).toBe(false);
  });
  it('LsParser.test return true', () => {
    expect(LsParser.test('ls')).toBe(true);
  });
  it('LsParser.defaultFilter cuts strings starts with .', () => {
    expect(
      ['.', '..', 'abc/', '.gitignore'].filter(LsParser.defaultFilter)
    ).toEqual(['abc/']);
  });
  it('LsParser.almostAllFilter cuts strings equal to "." or ".."', () => {
    expect(
      ['.', '..', 'abc/', '.gitignore'].filter(LsParser.almostAllFilter)
    ).toEqual(['abc/', '.gitignore']);
  });
  it('LsParser.allFilter cuts nothing', () => {
    expect(
      ['.', '..', 'abc/', '.gitignore'].filter(LsParser.allFilter)
    ).toEqual(['.', '..', 'abc/', '.gitignore']);
  });
  it('LsParser.execute without flags use LsParser.defaultFilter', () => {
    const spyDefaultFilter = jest.spyOn(LsParser, 'defaultFilter');
    const state = new CommandState();
    state.parsedData = {};
    LsParser.execute(state);
    expect(spyDefaultFilter).toBeCalledTimes(TerminalService.files.ls().length);
    expect(state.output).toEqual(
      TerminalService.files.ls().filter(LsParser.defaultFilter)
    );
  });
  it('LsParser.execute with -a use LsParser.allFilter', () => {
    const spyAllFilter = jest.spyOn(LsParser, 'allFilter');
    const state = new CommandState();
    state.parsedData = { flags: ['-a'] };
    LsParser.execute(state);
    expect(spyAllFilter).toBeCalledTimes(TerminalService.files.ls().length);
    expect(state.output).toEqual(
      TerminalService.files.ls().filter(LsParser.allFilter)
    );
  });
  it('LsParser.execute with --all use LsParser.allFilter', () => {
    const spyAllFilter = jest.spyOn(LsParser, 'allFilter');
    const state = new CommandState();
    state.parsedData = { flags: ['--all'] };
    LsParser.execute(state);
    expect(spyAllFilter).toBeCalledTimes(TerminalService.files.ls().length);
    expect(state.output).toEqual(
      TerminalService.files.ls().filter(LsParser.allFilter)
    );
  });
  it('LsParser.execute with -A use LsParser.allFilter', () => {
    const spyAlmostAllFilter = jest.spyOn(LsParser, 'almostAllFilter');
    const state = new CommandState();
    state.parsedData = { flags: ['-A'] };
    LsParser.execute(state);
    expect(spyAlmostAllFilter).toBeCalledTimes(
      TerminalService.files.ls().length
    );
    expect(state.output).toEqual(
      TerminalService.files.ls().filter(LsParser.almostAllFilter)
    );
  });
  it('LsParser.execute with --almost-all use LsParser.almostAllFilter', () => {
    const spyAlmostAllFilter = jest.spyOn(LsParser, 'almostAllFilter');
    const state = new CommandState();
    state.parsedData = { flags: ['--almost-all'] };
    LsParser.execute(state);
    expect(spyAlmostAllFilter).toBeCalledTimes(
      TerminalService.files.ls().length
    );
    expect(state.output).toEqual(
      TerminalService.files.ls().filter(LsParser.almostAllFilter)
    );
  });
});
