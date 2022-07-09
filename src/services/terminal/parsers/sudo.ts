import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';

// eslint-disable-next-line quotes
export const SUDO_ERROR = ["No 'sudo' allowed yet!"];

export class SudoParser extends AbstractParser {
  public static command = 'sudo';
  public static execute(state: CommandState) {
    state.output = SUDO_ERROR;
    state.status = -1;
  }
}
