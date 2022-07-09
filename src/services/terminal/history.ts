export class TerminalHistory {
  public static history: string[] = [];
  private static pointer = 0;

  public static add(s: string) {
    TerminalHistory.history.push(s);
    TerminalHistory.pointer = TerminalHistory.l;
  }
  private static getByPointer(): string {
    return TerminalHistory.history[TerminalHistory.pointer] ?? '';
  }
  public static prev(): string {
    TerminalHistory.pointer = Math.max(0, TerminalHistory.pointer - 1);
    return TerminalHistory.getByPointer();
  }
  public static next(): string {
    TerminalHistory.pointer = Math.min(
      TerminalHistory.l,
      TerminalHistory.pointer + 1
    );
    return TerminalHistory.getByPointer();
  }
  public static reset() {
    TerminalHistory.history = [];
    TerminalHistory.pointer = 0;
  }
  public static get l(): number {
    return TerminalHistory.history.length;
  }
  public static removeByIdx(idx: number) {
    TerminalHistory.history.splice(idx, 1);
  }
}
