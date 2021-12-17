import { CommandState } from 'Services/terminal/commandState';

export class AbstractParser {
  public static test(_s: string): boolean {
    return false;
  }
  public static parse(_s: string): CommandState['parsedData'] {
    return {};
  }
  public static execute(_state: CommandState) {}
  public static parseFlags(str: string): string[] {
    return (str.match(/\s--?([A-Za-z0-9-]+)/g) ?? []).map((f) => f.trim());
  }
}
