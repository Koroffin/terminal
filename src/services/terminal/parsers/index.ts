import { CommandState } from 'Services/terminal/commandState';
import { regexp } from './utils/regexp';

export class AbstractParser {
  public static command = 'abstract';
  public static canBeSingleWord = true;
  public static regexp(): RegExp {
    return regexp(this.command, { canBeSingleWord: this.canBeSingleWord });
  }
  public static test(s: string): boolean {
    return this.regexp().test(s);
  }
  public static parse(_s: string): CommandState['parsedData'] {
    return {};
  }
  public static execute(_state: CommandState) {}
  public static parseFlags(str: string): string[] {
    return (str.match(/\s--?([A-Za-z0-9-]+)/g) ?? [])
      .map((f) => f.trim())
      .reduce((acc, f) => {
        if (f.startsWith('--')) {
          acc.push(f);
          return acc;
        }

        return acc.concat(
          f
            .substring(1)
            .split('')
            .map((c) => `-${c}`)
        );
      }, []);
  }
}
