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


class HermDoc {
  constructor(initial) {
    this.keys = [];
    this.content = [];
    const i = ranID('');
    this.keys[0] = i;
    this.content[i] = '';
    if (initial) {
      this.push(0, initial);
    }
  }

  push(index, value) {
    Array.from(value).forEach((e, k) => {
      const i = ranID(e);
      this.keys.splice(index + k, 0, i);
      this.content[i] = e;
    });
  }

  duplicate() {
    const t = new HermDoc();
    t.keys = Object.assign([], this.keys);
    t.content = Object.assign([], this.content);
    return t;
  }

  display() {
    let r = '';

    this.keys.forEach((key) => {
      if (this.content[key]) { r += this.content[key]; }
    });

    return r;
  }

  displayRange(from, to) {
    const keys = this.getKeys();
    let r = '';

    keys.forEach((key, index) => {
      if (index >= from && index < to && this.content[key]) { r += this.content[key]; }
    });

    return r;
  }

  indexOf(key) {
    return this.keys.indexOf(key);
  }

  merge(newDoc) {
    const result = new HermDoc();
    let oldIndex = 0;
    let newIndex = 0;

    while (this.keys[oldIndex] || newDoc.keys[newIndex]) {
      if (this.keys[oldIndex] === newDoc.keys[newIndex]) {
        result.keys.push(this.keys[oldIndex]);
        oldIndex += 1;
        newIndex += 1;
      } else {
        while (this.keys[oldIndex] && newDoc.keys.indexOf(this.keys[oldIndex]) === -1) {
          result.keys.push(this.keys[oldIndex]);
          oldIndex += 1;
        }
        while (newDoc.keys[newIndex] && this.keys.indexOf(newDoc.keys[newIndex]) === -1) {
          result.keys.push(newDoc.keys[newIndex]);
          newIndex += 1;
        }
      }

      if (!this.keys[oldIndex]) {
        result.keys = result.keys.concat(newDoc.keys.slice(newIndex));
        break;
      }

      if (!newDoc.keys[newIndex]) {
        result.keys = result.keys.concat(this.keys.slice(oldIndex));
        break;
      }
    }

    result.content = Object.assign([], this.content);

    newDoc.keys.forEach((e) => {
      if (result.content[e] !== null) { result.content[e] = newDoc.content[e]; }
    });

    return result;
  }

  getKeys() {
    return this.keys.filter(e => this.content[e] !== null);
  }

  deleteRange(from, length) {
    const keys = this.getKeys();
    for (let i = 0; i < length; i += 1) {
      const k = keys[from + i];
      this.content[k] = null;
    }
  }
}

export default HermDoc;
