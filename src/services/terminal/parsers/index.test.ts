import { AbstractParser } from '.';

describe('AbstractParser', () => {
  it('AbstractParser.parse flags shoud work', () => {
    expect(AbstractParser.parseFlags('command -a -b --some-flag')).toEqual([
      '-a',
      '-b',
      '--some-flag',
    ]);
  });
  it('AbstractParser.test returns false by default', () => {
    expect(AbstractParser.test('command -a -b --some-flag')).toBe(false);
  });
  it('AbstractParser.parse returns empty oblect by default', () => {
    expect(AbstractParser.parse('command -a -b --some-flag')).toEqual({});
  });
});
