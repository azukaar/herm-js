/* eslint-disable import/no-duplicates */

import HermDoc from '../modules/index';
import { newHermDoc, display, push } from '../modules/index';

describe('Text', () => {
  test('Is able push text', () => {
    const doc = new HermDoc();
    doc.push(0, 'Hello');
    expect(doc.display()).toBe('Hello');
  });

  test('Is able push text at location', () => {
    const doc = new HermDoc();
    doc.push(0, 'Hello');
    doc.push(3, 'you');
    expect(doc.display()).toBe('Helyoulo');
  });

  test('Is able to duplicate', () => {
    const doc = new HermDoc();
    doc.push(0, 'Hello');
    const doc2 = doc.duplicate();
    expect(doc2.keys).toEqual(doc.keys);
  });

  test('Is able to merge', () => {
    const doc = new HermDoc();
    doc.push(0, 'Hello');

    const doc2 = doc.duplicate();
    doc.push(6, ' world');
    doc2.push(6, ' !');

    expect(doc.display()).toBe('Hello world');
    expect(doc2.display()).toBe('Hello !');

    doc.merge(doc2); // first merge
    expect(doc.display()).toBe('Hello world !');

    doc2.push(7, '?');
    expect(doc2.display()).toBe('Hello ?!');

    doc.merge(doc2); // no duplicates, even with outdated documents
    expect(doc.display()).toBe('Hello world ?!');
  });

  test('Is able to merge bigger in smaller', () => {
    const doc = new HermDoc();
    doc.push(0, 'H');

    const doc2 = doc.duplicate();
    doc.push(6, 'ello world');

    doc.merge(doc2);
    expect(doc.display()).toBe('Hello world');
  });

  test('Is able to display range', () => {
    const doc = new HermDoc('123456');
    expect(doc.displayRange(0, 3)).toBe('123');
  });

  describe('at document start', () => {
    test('merge into itself, empty', () => {
      const doc = new HermDoc();

      doc.merge(doc);
      doc.merge(doc);
      doc.merge(doc);

      expect(doc.display()).toBe('');
    });

    test('merge into itself, initial text', () => {
      const doc = new HermDoc('foobar');

      doc.merge(doc);
      doc.merge(doc);
      doc.merge(doc);

      expect(doc.display()).toBe('foobar');
    });

    test('three empty doc merge', () => {
      const doc1 = new HermDoc();
      const doc2 = new HermDoc();
      const doc3 = new HermDoc();

      doc1.merge(doc2);
      doc1.merge(doc3);

      doc2.merge(doc1);
      doc2.merge(doc3);

      doc3.merge(doc1);
      doc3.merge(doc1);

      expect(doc1.display()).toBe('');
      expect(doc2.display()).toBe('');
      expect(doc3.display()).toBe('');

      doc1.merge(doc2);
      doc1.merge(doc3);

      doc2.merge(doc1);
      doc2.merge(doc3);

      doc3.merge(doc1);
      doc3.merge(doc1);

      expect(doc1.display()).toBe('');
      expect(doc2.display()).toBe('');
      expect(doc3.display()).toBe('');
    });

    test('three non-empty doc merge', () => {
      const doc1 = new HermDoc('a');
      const doc2 = new HermDoc('b');
      const doc3 = new HermDoc('c');

      doc1.merge(doc2);
      doc1.merge(doc3);

      doc2.merge(doc1);
      doc2.merge(doc3);

      doc3.merge(doc1);
      doc3.merge(doc2);

      expect(doc1.display()).toBe('abc');
      expect(doc2.display()).toBe('abc');
      expect(doc3.display()).toBe('abc');
    });
  });

  describe('is able to delete', () => {
    describe('at start', () => {
      test('empty string - 1', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(0, 0);
        expect(doc.display()).toBe('123456');
      });

      test('empty string - 2', () => {
        const doc = new HermDoc('');
        doc.deleteRange(0, 0);
        expect(doc.display()).toBe('');
      });

      test('empty string - 3', () => {
        const doc = new HermDoc();
        doc.deleteRange(0, 0);
        expect(doc.display()).toBe('');
      });

      test('empty string - 4', () => {
        const doc = new HermDoc('foo');
        doc.deleteRange(0, 0);
        expect(doc.display()).toBe('foo');
      });

      test('empty string - 5', () => {
        const doc = new HermDoc('');
        doc.deleteRange(0, 9999);
        expect(doc.display()).toBe('');
      });

      test('empty string - 6', () => {
        const doc = new HermDoc();
        doc.deleteRange(0, 9999);
        doc.deleteRange(0, 9999);
        expect(doc.display()).toBe('');
      });

      test('empty string - 7', () => {
        const doc = new HermDoc('');
        doc.deleteRange(9999, 9999);
        doc.deleteRange(9999, 9999);
        expect(doc.display()).toBe('');
      });

      test('empty string - 8', () => {
        const doc = new HermDoc();
        doc.deleteRange(9999, 9999);
        doc.deleteRange(9999, 9999);
        expect(doc.display()).toBe('');
      });

      test('empty string - 9', () => {
        const doc = new HermDoc('foobar');
        doc.deleteRange(9999, 0);
        expect(doc.display()).toBe('foobar');
      });

      test('empty string - 10', () => {
        const doc = new HermDoc();
        doc.deleteRange(9999, 0);
        doc.deleteRange(9999, 0);
        expect(doc.display()).toBe('');
      });

      test('empty string - 11', () => {
        const doc = new HermDoc('');
        doc.deleteRange(9999, 0);
        doc.deleteRange(9999, 0);
        expect(doc.display()).toBe('');
      });

      test('non-empty string - 1', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(0, 3);
        expect(doc.display()).toBe('456');

        doc.deleteRange(0, 3);
        expect(doc.display()).toBe('');
      });

      test('non-empty string - 2', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(0, 3);
        expect(doc.display()).toBe('456');

        doc.deleteRange(0, 1);
        expect(doc.display()).toBe('56');

        doc.deleteRange(0, 1);
        expect(doc.display()).toBe('6');

        doc.deleteRange(0, 1);
        expect(doc.display()).toBe('');

        doc.deleteRange(0, 1);
        expect(doc.display()).toBe('');

        doc.deleteRange(0, 1);
        expect(doc.display()).toBe('');
      });

      test('non-empty string - 3', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(0, 3);
        expect(doc.display()).toBe('456');

        doc.deleteRange(0, 9999);
        expect(doc.display()).toBe('');

        doc.deleteRange(0, 9999);
        expect(doc.display()).toBe('');
      });
    });

    describe('in the middle', () => {
      test('empty string', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(3, 0);
        expect(doc.display()).toBe('123456');
        doc.deleteRange(3, 0);
        doc.deleteRange(3, 0);
        expect(doc.display()).toBe('123456');
      });

      test('non-empty string - 1', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(3, 0);
        expect(doc.display()).toBe('123456');
        doc.deleteRange(3, 1);
        expect(doc.display()).toBe('12356');
        doc.deleteRange(3, 1);
        expect(doc.display()).toBe('1236');
      });

      test('non-empty string - 2', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(1, 4);
        expect(doc.display()).toBe('16');
      });
    });

    describe('in the end', () => {
      test('behind range', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(6, 1);
        expect(doc.display()).toBe('123456');
        doc.deleteRange(9999, 9999);
        expect(doc.display()).toBe('123456');
      });

      test('empty string', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(5, 0);
        expect(doc.display()).toBe('123456');
        doc.deleteRange(5, 0);
        expect(doc.display()).toBe('123456');
        doc.deleteRange(5, -1);
        expect(doc.display()).toBe('123456');
      });

      test('last char', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(5, 1);
        expect(doc.display()).toBe('12345');
        doc.deleteRange(5, 1);
        expect(doc.display()).toBe('12345');
      });

      test('last char twice', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(5, 1);
        expect(doc.display()).toBe('12345');
        doc.deleteRange(4, 1);
        expect(doc.display()).toBe('1234');
      });

      test('last two chars', () => {
        const doc = new HermDoc('123456');
        doc.deleteRange(4, 2);
        expect(doc.display()).toBe('1234');
        doc.deleteRange(2, 2);
        expect(doc.display()).toBe('12');
        doc.deleteRange(0, 2);
        expect(doc.display()).toBe('');
        doc.deleteRange(0, 2);
        expect(doc.display()).toBe('');
        doc.deleteRange(0, 9999);
        expect(doc.display()).toBe('');
      });
    });

    test('without recovering deleted keys on merge', () => {
      const doc = new HermDoc('hello');
      const doc2 = doc.duplicate();
      doc.deleteRange(1, 1);
      doc.merge(doc2);
      expect(doc.display()).toBe('hllo');
    });
  });
});

test('use plain object', () => {
  let doc = newHermDoc();
  doc = push(doc, 0, 'hey');
  expect(display(doc)).toBe('hey');
});
