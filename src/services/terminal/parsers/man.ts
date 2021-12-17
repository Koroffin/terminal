import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';

import historyJson from 'Services/terminal/man/history.json';
import grepJson from 'Services/terminal/man/grep.json';

export const MAN_ERROR = ['Cannot find man for that!'];

const manHash: { [s: string]: string[] } = {
  history: historyJson.data,
  grep: grepJson.data,
  ERROR: MAN_ERROR,
};

export class ManParser extends AbstractParser {
  public static parsedName: string = null;
  public static test(str: string): boolean {
    return /^man\s([\S\s]+)$/i.test(str);
  }
  public static parse(str: string): CommandState['parsedData'] {
    const match = str.match(/^man\s([\S\s]+)$/i);
    if (match === null) {
      return { name: 'ERROR' };
    }
    return { name: match[1] };
  }
  public static execute(state: CommandState) {
    const output = manHash[state.parsedData.name];
    state.output = output ?? MAN_ERROR;
  }
}
