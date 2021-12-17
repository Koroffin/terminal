import { CommandState } from './commandState';
import { TerminalFiles } from './files';
import { TerminalHistory } from './history';

import { GrepParser } from './parsers/grep';
import { HistoryParser } from './parsers/history';
import { LsParser } from './parsers/ls';
import { ManParser } from './parsers/man';
import { SudoParser } from './parsers/sudo';

export class TerminalService {
  public static history = TerminalHistory;
  public static files = TerminalFiles;
  private static parsers = [
    SudoParser,
    HistoryParser,
    ManParser,
    GrepParser,
    LsParser,
  ];
  public static init() {
    TerminalService.files.generateDefaultTree();
  }
  public static reset() {
    TerminalService.files.reset();
    TerminalService.history.reset();
  }
  public static parse(str: string): string[] {
    TerminalService.history.add(str);
    const { parsers } = TerminalService;
    const cleanStr = str.replace(/\s+/g, ' ').trim();
    const commands = cleanStr.split('|').map((s) => s.trim());
    const state = new CommandState();
    for (let i = 0, l = commands.length; i < l; i++) {
      const command = commands[i];
      for (let j = 0, _l = parsers.length; j < _l; j++) {
        const parser = parsers[j];
        if (parser.test(command)) {
          state.parsedData = parser.parse(command);
          parser.execute(state);
        }
      }
    }
    return state.output;
  }
}
