import { parseSearchParams } from './FilterHelper';

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
