import HermJsonDoc from '../modules/json';

describe('JSON', () => {
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
    let docJson = new HermJsonDoc();
    docJson.key = '123';
    expect(docJson.display()).toEqual({ key: '123' });

    const docJson2 = docJson.duplicate();
    docJson2.key = '5';
    docJson2.key2 = '7';

    docJson = docJson.merge(docJson2);

    expect(docJson.display()).toEqual({ key: '5', key2: '7' });
  });
});
