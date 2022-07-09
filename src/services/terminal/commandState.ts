export class CommandState {
  public status = 0;
  public output: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public parsedData: { [s: string]: any };
}
