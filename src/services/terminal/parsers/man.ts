import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';

import historyJson from 'Services/terminal/man/history.json';
import grepJson from 'Services/terminal/man/grep.json';
import lsJson from 'Services/terminal/man/ls.json';

export const MAN_ERROR = ['Cannot find man for that!'];

export const manHash: { [s: string]: string[] } = {
  history: historyJson.data,
  grep: grepJson.data,
  ls: lsJson.data,
  ERROR: MAN_ERROR,
};

export class ManParser extends AbstractParser {
  public static parsedName: string = null;
  public static canBeSingleWord = false;
  public static command = 'man';
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
