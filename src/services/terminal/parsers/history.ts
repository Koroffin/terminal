import { AbstractParser } from '.';
import { TerminalService } from 'Services/terminal';
import { CommandState } from 'Services/terminal/commandState';

export class HistoryParser extends AbstractParser {
  public static command = 'history';
  public static parse(str: string): CommandState['parsedData'] {
    const nMatch = str.match(/^history\s([0-9]+)/i);
    const dMatch = str.match(/-d\s([0-9]+)/i);

    return {
      flags: HistoryParser.parseFlags(str),
      n: nMatch !== null ? +nMatch[1] : undefined,
      d: dMatch !== null ? +dMatch[1] : undefined,
    };
  }
  public static execute(state: CommandState) {
    const {
      parsedData: { flags = [], n = 0, d = 0 },
    } = state;

    for (let i = 0, l = flags.length; i < l; i++) {
      const flag = flags[i];

      if (flag === '-c') {
        TerminalService.history.reset();
      }
    }

    if (d > 0) {
      TerminalService.history.removeByIdx(d - 1);
    }

    const historyArray =
      n === 0
        ? TerminalService.history.history
        : TerminalService.history.history.slice(-1 * n);

    const inc =
      n === 0 || n >= TerminalService.history.l
        ? 1
        : TerminalService.history.l - n + 1;
    state.output = historyArray.map((h, i) => `${inc + i}  ${h}`);
  }
}
