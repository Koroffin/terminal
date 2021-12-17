import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';

export const NO_PATTERN_ERROR = ['Pattern should be provided to grep'];

export class GrepParser extends AbstractParser {
  public static test(str: string): boolean {
    return /^grep(\s|$)/i.test(str);
  }
  public static parse(str: string): CommandState['parsedData'] {
    const patternMatch =
      str.match(/\s(?:'|")([^"']+)(?:'|")/i) ??
      str.match(/grep\s(?:-[^\s]+\s)*([^-][^\s]+)/i);

    return {
      flags: GrepParser.parseFlags(str),
      pattern: patternMatch !== null ? patternMatch[1] : undefined,
    };
  }
  public static execute(state: CommandState) {
    const {
      parsedData: { pattern },
      output,
    } = state;

    if (!pattern) {
      state.output = NO_PATTERN_ERROR;
      return;
    }

    state.output = output.filter((s) => s.indexOf(pattern) !== -1);
  }
}
