import { AbstractParser } from '.';
import { CommandState } from 'Services/terminal/commandState';

export const NO_PATTERN_ERROR = ['Pattern should be provided to grep'];

export class GrepParser extends AbstractParser {
  public static command = 'grep';
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
      parsedData: { pattern, flags = [] },
      output,
    } = state;

    const options = {
      ignoreCase: false,
      match: 'all'
    }

    if (!pattern) {
      state.output = NO_PATTERN_ERROR;
      return;
    }

    for (let i = 0, l = flags.length; i < l; i++) {
      const flag = flags[i];
      if (flag === '-i' || flag === '--ignore-case') {
        options.ignoreCase = true;
      }
      if (flag === '-w' || flag === '--word-regexp') {
        options.match = 'word';
      }
      if (flag === '-x' || flag === '--extended-regexp') {
        options.match = 'line';
      }
    }

    state.output = output.filter((s) => {
      const updatedPattern = options.match === 'word' ? `\\b${pattern}\\b` : options.match === 'line' ? `^${pattern}$` : pattern;
      return s.match(new RegExp(updatedPattern, options.ignoreCase ? 'i' : ''));
    });
  }
}
