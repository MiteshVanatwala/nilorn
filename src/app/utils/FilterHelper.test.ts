import { parseSearchParams, transformObjectToStrings } from './FilterHelper';

describe('parseSearchParams', () => {
  it('should parse query string without leading ?', () => {
    const queryStr = 'clients=EUC106501&projects=Linnea&statuses=Design';
    const expected = {
      clients: 'EUC106501',
      projects: 'Linnea',
      statuses: 'Design',
    };
    expect(parseSearchParams(queryStr)).toEqual(expected);
  });

  it('should parse query string with leading ?', () => {
    const queryStr = '?clients=EUC106501&projects=Spring&statuses=Design';
    const expected = {
      clients: 'EUC106501',
      projects: 'Spring',
      statuses: 'Design',
    };
    expect(parseSearchParams(queryStr)).toEqual(expected);
  });

  it('should decode URL-encoded values', () => {
    const queryStr = '?name=John%20Doe&age=30';
    const expected = {
      name: 'John Doe',
      age: '30',
    };
    expect(parseSearchParams(queryStr)).toEqual(expected);
  });

  it('should handle empty query string', () => {
    const queryStr = '';
    const expected = {};
    expect(parseSearchParams(queryStr)).toEqual(expected);
  });

  it('should handle query string with empty values', () => {
    const queryStr = '?param1=&param2=';
    const expected = {
      param1: '',
      param2: '',
    };
    expect(parseSearchParams(queryStr)).toEqual(expected);
  });
});

describe('transformObjectToStrings', () => {
  it('transforms object with arrays of objects to strings', () => {
    const obj = {
      array1: [{ value: 'foo' }, { value: 'bar' }],
      array2: [{ value: true }, { value: false }],
      otherProp: 'baz',
    };

    const expected = {
      array1: ['foo', 'bar'],
      array2: [true, false],
      otherProp: 'baz',
    };

    expect(transformObjectToStrings(obj)).toEqual(expected);
  });

  it('transforms object with single object values to strings', () => {
    const obj = {
      prop1: { value: 'hello' },
      prop2: { value: true },
      prop3: 'world',
    };

    const expected = {
      prop1: 'hello',
      prop2: true,
      prop3: 'world',
    };

    expect(transformObjectToStrings(obj)).toEqual(expected);
  });

  it('does not modify object with non-matching values', () => {
    const obj = {
      prop1: { name: 'hello' },
      prop2: ['foo', 'bar'],
      prop3: 42,
      prop4: 'world',
    };

    expect(transformObjectToStrings(obj)).toEqual(obj);
  });
});
