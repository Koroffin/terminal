import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';
import { TerminalService } from 'Services/terminal';

export class LsParser extends AbstractParser {
  public static test(str: string): boolean {
    return /^ls(\s|$)/i.test(str);
  }
  public static execute(state: CommandState) {
    state.output = TerminalService.files.ls();
  }
}
