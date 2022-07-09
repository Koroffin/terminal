import { regexp } from './regexp';

describe('regexp', () => {
  it('should return a regexp', () => {
    const s = 'test';
    const r = regexp(s);
    expect(r.source).toBe(`^${s}(\\s|$)`);
  });
  it('should return a regexp with canBeSingleWord = false', () => {
    const s = 'test';
    const r = regexp(s, { canBeSingleWord: false });
    expect(r.source).toBe(`^${s}\\s([\\S\\s]+)$`);
  });
});
