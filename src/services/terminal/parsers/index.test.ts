import { AbstractParser } from '.';

describe('AbstractParser', () => {
  it('AbstractParser.parse flags shoud work', () => {
    expect(AbstractParser.parseFlags('command -a -B --some-flag')).toEqual([
      '-a',
      '-B',
      '--some-flag',
    ]);
  });
  it('AbstractParser.parse flags without any flag', () => {
    expect(AbstractParser.parseFlags('command')).toEqual([]);
  });
  it('AbstractParser.test returns false by default', () => {
    expect(AbstractParser.test('command -a -b --some-flag')).toBe(false);
  });
  it('AbstractParser.parse returns empty oblect by default', () => {
    expect(AbstractParser.parse('command -a -b --some-flag')).toEqual({});
  });
});
