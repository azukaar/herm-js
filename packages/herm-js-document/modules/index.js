
class HermDoc {
	constructor(initial) {
    this.keys = [];
    this.content = [];
      let i = parseInt(Date.now() + '' + parseInt(Math.random() * 10000)) + '' + parseInt(Math.random() * 10000);
    this.keys[0] = i;
    this.content[i] = '';
    if(initial) {
	    this.push(0, initial)
    }
  }

  push(index, value) {
  	let docIndex = this.keys[index];

  	Array.from(value).forEach( (e,k) => {
      let i = parseInt(Date.now() + '' + parseInt(Math.random() * 10000)) + '' + parseInt(Math.random() * 10000);
      this.keys.splice(index+k,0,i);
      this.content[i] = e;
    });
  }
  
  duplicate() {
  	let t = new HermDoc();
    t.keys = Object.assign([], this.keys);
    t.content = Object.assign([], this.content);
    return t;
  }

  display() {
  	let r = "";
  	
    this.keys.forEach((key) => {
    	if(this.content[key])
	      r += this.content[key];
    });
    
    return r;
  }

  displayRange(from, to) {
    const keys = this.getKeys();
  	let r = "";
  	
    keys.forEach((key, index) => {
    	if(index >= from && index < to && this.content[key])
	      r += this.content[key];
    });
    
    return r;
  }
  
  indexOf(key) {
  	return this.keys.indexOf(key);
  }

  merge(newDoc) {
    let result = new HermDoc();
    let oldIndex = 0;
    let newIndex = 0;

    while(this.keys[oldIndex] || newDoc.keys[newIndex]) {
      if(this.keys[oldIndex] === newDoc.keys[newIndex]) {
        result.keys.push(this.keys[oldIndex]);
        oldIndex++;
        newIndex++;
      }
      else {
        while(this.keys[oldIndex] && newDoc.keys.indexOf(this.keys[oldIndex]) === -1) {
          result.keys.push(this.keys[oldIndex]);
          oldIndex++;
        }
        while(newDoc.keys[newIndex] && this.keys.indexOf(newDoc.keys[newIndex]) === -1) {
          result.keys.push(newDoc.keys[newIndex]);
          newIndex++;
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

    result.content = Object.assign([], this.content, newDoc.content);
    
    return result;
  }

  getKeys() {
    return this.keys.filter(e => this.content[e] !== null);
  }

  deleteRange(from, length) {
    const keys = this.getKeys();
    for(let i = 0; i < length; i++) {
      const k = keys[from + i];
      this.content[k] = null;
    }
  }
}

export default HermDoc;