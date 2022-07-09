import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';
import { TerminalService } from 'Services/terminal';

export class LsParser extends AbstractParser {
  public static command = 'ls';
  public static defaultFilter(str: string): boolean {
    return !str.startsWith('.');
  }
  public static allFilter(): boolean {
    return true;
  }
  public static almostAllFilter(str: string): boolean {
    return str !== '.' && str !== '..';
  }
  public static execute(state: CommandState) {
    const {
      parsedData: { flags = [] },
    } = state;

    let filter = LsParser.defaultFilter;
    for (let i = 0, l = flags.length; i < l; i++) {
      const flag = flags[i];

      if (flag === '-a' || flag === '--all') {
        filter = LsParser.allFilter;
      }
      if (flag === '-A' || flag === '--almost-all') {
        filter = LsParser.almostAllFilter;
      }
    }

    state.output = TerminalService.files.ls().filter(filter);
  }
}
