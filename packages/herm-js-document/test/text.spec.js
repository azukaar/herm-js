import HermDoc from '../modules/index';

describe('Text', () => {
    test('Is able push text', () => {
        let doc = new HermDoc();
        doc.push(0, 'Hello');
        expect(doc.display()).toBe('Hello');
    });

    test('Is able push text at location', () => {
        let doc = new HermDoc();
        doc.push(0, 'Hello');
        doc.push(3, 'you');
        expect(doc.display()).toBe('Helyoulo');
    });

    test('Is able to duplicate', () => {
        let doc = new HermDoc();
        doc.push(0, 'Hello');
        let doc2 = doc.duplicate();
        expect(doc2.keys).toEqual(doc.keys);
    });

    test('Is able to merge', () => {
        let doc = new HermDoc();
        doc.push(0, 'Hello');

        let doc2 = doc.duplicate();
        doc.push(6, ' world');
        doc2.push(6, ' !');

        expect(doc.display()).toBe('Hello world');
        expect(doc2.display()).toBe('Hello !');

        doc = doc.merge(doc2); // first merge 
        expect(doc.display()).toBe('Hello world !');

        doc2.push(7, '?');
        expect(doc2.display()).toBe('Hello ?!');

        doc = doc.merge(doc2); // no duplicates, even with outdated documents
        expect(doc.display()).toBe('Hello world ?!');
    });
    
    test('Is able to delete', () => {
        let doc = new HermDoc('123456');
        doc.deleteRange(0, 3);
        expect(doc.display()).toBe('456');
    });

    test('Is able to display range', () => {
        let doc = new HermDoc('123456');
        expect(doc.displayRange(0, 3)).toBe('123');
    });
});
