import { newHermDoc, displayRange, indexOf, deleteRange, duplicate, push, merge } from './index';

const toJsonAtt = (prop, v) => `${JSON.stringify({ [prop]: v }).replace(/^{/, '').replace(/}$/, '')},`;

function displayJson(doc) {
  return JSON.parse(doc.data.display().replace(/,}$/, '}'));
}

function duplicateJson(doc) {
  if (doc.duplicate) {
    return doc.duplicate();
  }

  return {
    index: Object.assign([], doc.index),
    data: duplicate(doc.data),
  };
}

function mergeJson(from, doc) {
  const temp = duplicateJson(from);
  temp.data = merge(temp.data, doc.data);
  temp.index = Object.assign([], doc.index);
  return temp;
}

function get(doc, prop) {
  if (prop in doc) { return doc[prop]; }

  const temp = JSON.parse(`{${displayRange(doc.data, indexOf(doc.data, doc.index[prop].pos), doc.index[prop].len)}}`);
  return temp[prop];
}

function set(doc, prop, value) {
  const newDoc = duplicateJson(doc);

  if (prop in newDoc) {
    newDoc[prop] = value;
    return true;
  }

  const stringValue = toJsonAtt(prop, value);

  if (!newDoc.index[prop]) {
    newDoc.index[prop] = {
      pos: newDoc.data.keys.length - 2,
      len: stringValue.length,
    };
    newDoc.data = push(newDoc.data, newDoc.data.keys.length - 2, stringValue);
    newDoc.index[prop].pos = newDoc.data.keys[newDoc.index[prop].pos];
  } else {
    const realIndex = newDoc.data.keys.indexOf(newDoc.index[prop].pos);
    newDoc.data = deleteRange(newDoc.data, realIndex, newDoc.index[prop].len);
    newDoc.index[prop].len = stringValue.length;
    newDoc.data = push(newDoc.data, realIndex, stringValue);
    newDoc.index[prop].pos = newDoc.data.keys[realIndex];
  }

  return newDoc;
}

function newHermJsonDoc(initial) {
  let initData = newHermDoc('{}');
  let initIndex = [];

  if (typeof initial === 'object' && initial.data && initial.index) {
    initData = initial.data.duplicate();
    initIndex = Object.assign([], initial.index);
  }

  return {
    data: initData,
    index: initIndex,
  };
}

class HermJsonDoc {
  constructor(initial) {
    const result = newHermJsonDoc(initial);

    this.setFrom = (doc) => {
      this.data = duplicate(doc.data);
      this.index = Object.assign([], doc.index);
    };

    return new Proxy(result, {
      get(obj, prop) {
        return get(obj, prop);
      },
      set: (obj, prop, value) => {
        this.setFrom(set(obj, prop, value));
        return true;
      },
    });
  }

  duplicate() {
    const temp = new HermJsonDoc({
      data: this.data,
      index: Object.assign([], this.index),
    });

    return temp;
  }

  merge(doc) {
    this.setFrom(mergeJson(this, doc));
  }

  display() {
    return displayJson(this);
  }
}

export default HermJsonDoc;
export {
  displayJson,
  duplicateJson,
  mergeJson,
  get,
  set,
  newHermJsonDoc,
};
