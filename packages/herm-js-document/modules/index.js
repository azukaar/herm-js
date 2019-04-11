function ranID(value) {
  const cuDate = (`${Date.now()}`).slice(5);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=+][}{|/.,?><~£≈ç√∫~µåß∂ƒ©∆œ∑®†^^©˙∆';
  let text = '';

  for (let i = 0; i < 4; i += 1) {
    const t = parseInt(cuDate.slice(i * 2, (i * 2) + 2), 10);
    text += chars.charAt(t);
  }

  for (let i = 0; i < 3; i += 1) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  text += value;

  return text;
}

function indexOf(doc, element) {
  return doc.keys.indexOf(element);
}

function getKeys(doc) {
  return doc.keys.filter(e => doc.content[e] !== null);
}

function duplicate(doc) {
  if (doc.duplicate) {
    return doc.duplicate();
  }

  return {
    keys: Object.assign([], doc.keys),
    content: Object.assign([], doc.content),
  };
}

function display(doc) {
  let r = '';

  doc.keys.forEach((key) => {
    if (doc.content[key]) { r += doc.content[key]; }
  });

  return r;
}

function deleteRange(doc, from, length) {
  const nextDoc = duplicate(doc);
  const keys = getKeys(doc);
  for (let i = 0; i < length; i += 1) {
    const k = keys[from + i];
    nextDoc.content[k] = null;
  }
  return nextDoc;
}

function displayRange(doc, from, to) {
  const keys = getKeys(doc);
  let r = '';

  keys.forEach((key, index) => {
    if (index >= from && index < to && doc.content[key]) { r += doc.content[key]; }
  });

  return r;
}

function push(doc, index, value) {
  const nextDoc = duplicate(doc);
  Array.from(value).forEach((e, k) => {
    const i = ranID(e);
    nextDoc.keys.splice(index + k, 0, i);
    nextDoc.content[i] = e;
  });
  return nextDoc;
}

function merge(doc, newDoc) {
  const result = {
    keys: [],
    content: [],
  };
  let oldIndex = 0;
  let newIndex = 0;

  while (doc.keys[oldIndex] || newDoc.keys[newIndex]) {
    if (doc.keys[oldIndex] === newDoc.keys[newIndex]) {
      result.keys.push(doc.keys[oldIndex]);
      oldIndex += 1;
      newIndex += 1;
    } else {
      while (doc.keys[oldIndex] && newDoc.keys.indexOf(doc.keys[oldIndex]) === -1) {
        result.keys.push(doc.keys[oldIndex]);
        oldIndex += 1;
      }
      while (newDoc.keys[newIndex] && doc.keys.indexOf(newDoc.keys[newIndex]) === -1) {
        result.keys.push(newDoc.keys[newIndex]);
        newIndex += 1;
      }
    }

    if (!doc.keys[oldIndex]) {
      result.keys = result.keys.concat(newDoc.keys.slice(newIndex));
      break;
    }

    if (!newDoc.keys[newIndex]) {
      result.keys = result.keys.concat(doc.keys.slice(oldIndex));
      break;
    }
  }

  result.content = Object.assign([], doc.content);

  newDoc.keys.forEach((e) => {
    if (result.content[e] !== null) { result.content[e] = newDoc.content[e]; }
  });

  return result;
}

function newHermDoc(initial) {
  let result = {
    keys: [],
    content: [],
  };

  const i = ranID('');
  result.keys[0] = i;
  result.content[i] = '';
  if (typeof initial === 'string') {
    result = push(result, 0, initial);
  } else if (typeof initial === 'object' && initial.keys && initial.content) {
    result.keys = Object.assign([], initial.keys);
    result.content = Object.assign([], initial.content);
  }

  return result;
}

class HermDoc {
  constructor(initial) {
    this.set(newHermDoc(initial));
  }

  set(fromDoc) {
    this.keys = Object.assign([], fromDoc.keys);
    this.content = Object.assign([], fromDoc.content);
  }

  duplicate() {
    const t = new HermDoc();
    t.keys = Object.assign([], this.keys);
    t.content = Object.assign([], this.content);
    return t;
  }

  display() {
    return display(this);
  }

  displayRange(from, to) {
    return displayRange(this, from, to);
  }

  indexOf(element) {
    return indexOf(this, element);
  }

  getKeys() {
    return getKeys(this);
  }

  deleteRange(from, length) {
    this.set(deleteRange(this, from, length));
  }

  push(index, value) {
    this.set(push(this, index, value));
  }

  merge(newDoc) {
    this.set(merge(this, newDoc));
  }
}

export default HermDoc;
export {
  ranID,
  indexOf,
  getKeys,
  duplicate,
  display,
  deleteRange,
  displayRange,
  push,
  merge,
  newHermDoc,
};
