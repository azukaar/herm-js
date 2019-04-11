/* eslint-disable import/no-duplicates */

import HermJsonDoc from '../modules/json';
import { newHermJsonDoc, set, get } from '../modules/json';

describe('JSON', () => {
  test('Is able create JSON', () => {
    const docJson = new HermJsonDoc();
    expect(docJson.display()).toEqual({});
  });

  test('Is able push JSON', () => {
    const docJson = new HermJsonDoc();
    docJson.key = '123';
    expect(docJson.key).toBe('123');
  });

  test('Is able parse to JSON', () => {
    const docJson = new HermJsonDoc();
    docJson.key = '123';
    expect(docJson.display()).toEqual({ key: '123' });
  });

  test('Is able merge JSON', () => {
    const docJson = new HermJsonDoc();
    docJson.key = '123';
    expect(docJson.display()).toEqual({ key: '123' });

    const docJson2 = docJson.duplicate();
    docJson2.key = '5';
    docJson2.key2 = '7';

    docJson.merge(docJson2);

    expect(docJson.display()).toEqual({ key: '5', key2: '7' });
  });

  test('plain Object', () => {
    let docJson = newHermJsonDoc();
    docJson = set(docJson, 'key', 123);
    expect(get(docJson, 'key')).toBe(123);
  });
});
