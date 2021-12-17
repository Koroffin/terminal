import { generateCoolName } from '.';

describe('generateCoolName', () => {
  it('cool names are all different', function () {
    expect(generateCoolName() === generateCoolName()).toBe(false);
  });
  it('cool name for directory format', function () {
    expect(
      /^[A-Z][a-z]+\s[A-Z][A-Za-z\s]+$/.test(generateCoolName({ isDir: true }))
    ).toBe(true);
  });
  it('cool name for file format', function () {
    expect(
      /^[a-z\s]+_[a-z_]+\.[a-z]+$/.test(generateCoolName({ isDir: false }))
    ).toBe(true);
  });
});
