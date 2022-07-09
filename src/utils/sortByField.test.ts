import { sortByField } from './sortByField';

const mockData = [
  {
    name: 'aa',
    value: -1,
  },
  {
    name: 'Az',
    value: 5,
  },
  {
    name: 'ab',
    value: 2,
  },
];

describe('sortByField', () => {
  it('sortByField with string fields should work', () => {
    expect(sortByField(mockData, 'name').map((d) => d.name)).toEqual([
      'aa',
      'ab',
      'Az',
    ]);
  });
  it('sortByField with number fields should work', () => {
    expect(sortByField(mockData, 'value').map((d) => d.value)).toEqual([
      -1, 2, 5,
    ]);
  });
  it('sortByField should not change arguments', () => {
    expect(sortByField(mockData, 'value')).not.toStrictEqual(mockData);
  });
});
