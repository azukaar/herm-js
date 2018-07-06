class NetworkCompensator {
  constructor(value) {
    const time = Date.now();

    this.values = [{
      time,
      value,
    }];
  }

  toString() {
    const { length } = this.values;

    if (length > 2) {
      const ult = this.values[length - 1];
      const penult = this.values[length - 2];

      const timeDiff = ult.time - penult.time;
      const valueDiff = ult.value - penult.value;

      const currentTime = Date.now();
      const sinceLastUpdate = currentTime - ult.time;

      const scaling = valueDiff / timeDiff;

      return ult.value + (scaling * sinceLastUpdate);
    }

    return this.values[length - 1].value;
  }

  set(value) {
    const time = Date.now();
    this.values.push({
      value,
      time,
    });
    if (this.values.length > 3) this.values.shift();
  }
}

export default NetworkCompensator;
