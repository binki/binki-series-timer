import LineParser from './LineParser';

it('returns empty for an empty line', () => {
  expect(new LineParser('').nextAnyWhitespace()).toStrictEqual('');
});

it('keeps spaces in tab-separated values', () => {
  const lp = new LineParser('this\tis a\ttest \tyeah');
  for (const value of [
    'this',
    'is a',
    'test ',
    'yeah',
  ]) {
    expect(lp.nextTabbed()).toStrictEqual(value);
  }
  expect(lp.nextTabbed()).toStrictEqual('');
});
