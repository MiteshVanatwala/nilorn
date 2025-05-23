import {
  convertQueryStringToFilterObject,
  parseSearchParams,
} from './FilterHelper';

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

describe('convertQueryStringToObject', () => {
  it('should parse and convert a basic query string', () => {
    const query =
      '?searchQuery=asdf&clients=EUC101481,EUC100320&statuses=Artwork&indirectCosts=23';
    const expected = {
      searchQuery: 'asdf',
      clients: ['EUC101481', 'EUC100320'],
      statuses: ['Artwork'],
      indirectCosts: '23',
    };
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });

  it('should handle missing values', () => {
    const query = '?searchQuery=&clients=&statuses=&indirectCosts=';
    const expected = {};
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });

  it('should handle unknown parameters', () => {
    const query = '?unknownParam=test&clients=EUC101481';
    const expected = {
      unknownParam: 'test',
      clients: ['EUC101481'],
    };
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });

  it(`should handle 'includeClosed' parameter as boolean`, () => {
    const query = '?includeClosed=true&searchQuery=true';
    const expected = {
      searchQuery: 'true',
      includeClosed: true,
    };
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });

  it('should handle multiple parameters of the same type', () => {
    const query = '?clients=EUC101481,EUC100320';
    const expected = {
      clients: ['EUC101481', 'EUC100320'],
    };
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });

  it('should handle mixed types', () => {
    const query =
      '?searchQuery=test&clients=EUC101481,EUC100320&finishedWidths=50&finishedHeights=100';
    const expected = {
      searchQuery: 'test',
      clients: ['EUC101481', 'EUC100320'],
      finishedWidths: '50',
      finishedHeights: '100',
    };
    expect(convertQueryStringToFilterObject(query)).toEqual(expected);
  });
});
