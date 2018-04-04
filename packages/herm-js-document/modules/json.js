import HermDoc from './index';

const toJsonAtt = (prop, v) => `${JSON.stringify({ [prop]: v }).replace(/^{/, '').replace(/}$/, '')},`;

class HermJsonDoc {
  constructor() {
    return new Proxy({
      data: new HermDoc('{}'),
      index: [],
      display() {
        return JSON.parse(this.data.display().replace(/,}$/, '}'));
      },
      merge(doc) {
        const temp = new HermJsonDoc();
        temp.data = this.data.duplicate();
        temp.data = temp.data.merge(doc.data);
        temp.index = Object.assign([], this.index);
        return temp;
      },
      duplicate() {
        const temp = new HermJsonDoc();
        temp.data = this.data.duplicate();
        temp.index = Object.assign([], this.index);
        return temp;
      },
    }, {
      get(obj, prop) {
        if (prop in obj) { return obj[prop]; }

        const temp = JSON.parse(`{${obj.data.displayRange(obj.data.indexOf(obj.index[prop].pos), obj.index[prop].len)}}`);
        return temp[prop];
      },
      /* eslint-disable no-param-reassign */
      set(obj, prop, value) {
        if (prop in obj) {
          obj[prop] = value;
          return true;
        }

        const stringValue = toJsonAtt(prop, value);

        if (!obj.index[prop]) {
          obj.index[prop] = {
            pos: obj.data.keys.length - 2,
            len: stringValue.length,
          };

          obj.data.push(obj.data.keys.length - 2, stringValue);
          obj.index[prop].pos = obj.data.keys[obj.index[prop].pos];
        } else {
          const realIndex = obj.data.keys.indexOf(obj.index[prop].pos);
          obj.data.deleteRange(realIndex, obj.index[prop].len);
          obj.index[prop].len = stringValue.length;
          obj.data.push(realIndex, stringValue);
          obj.index[prop].pos = obj.data.keys[realIndex];
        }
        return true;
      },
      /* eslint-enable no-param-reassign */
    });
  }
}

export default HermJsonDoc;
