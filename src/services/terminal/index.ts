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
  private static sanitize(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
  }
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
    const cleanStr = TerminalService.sanitize(str);
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
  public static autocomplete(str: string): string[] {
    const { parsers } = TerminalService;
    const cleanStr = TerminalService.sanitize(str);
    const res: string[] = [];
    for (let i = 0, l = parsers.length; i < l; i++) {
      const { command } = parsers[i];
      if (command.startsWith(cleanStr)) {
        res.push(command);
      }
    }
    return res.sort((a, b) => a.localeCompare(b));
  }
}
