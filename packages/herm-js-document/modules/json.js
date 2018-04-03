import HermDoc from './index';

const toJsonAtt = (prop, v) => {
 	return JSON.stringify({[prop]: v}).replace(/^{/, '').replace(/}$/, '')+',';
}

class HermJsonDoc {
	constructor() {
  	return new Proxy({
    		_data : new HermDoc('{}'),
        _index : [],
        display : function () {
        	return JSON.parse(this._data.display().replace(/,}$/, '}'));
        },
        merge : function(doc) {
        	const temp = new HermJsonDoc();
        	temp._data = this._data.duplicate();
        	temp._data = temp._data.merge(doc._data);
          temp._index = Object.assign([], this._index);
          return temp;
        },
        duplicate : function() {
        	const temp = new HermJsonDoc();
        	temp._data = this._data.duplicate();
          temp._index = Object.assign([], this._index);
          return temp;
        }
    	}, {
        get: function(obj, prop) {
					if(prop in obj) 
            return obj[prop]
          else {
            let temp = JSON.parse('{' + obj._data.displayRange(obj._data.indexOf(obj._index[prop].pos), obj._index[prop].len) + '}');
            return temp[prop];
          }
        },
        set: function(obj, prop, value) {
					if(prop in obj ) {
            obj[prop] = value;
            return true;
          } 
          else {
          		value = toJsonAtt(prop, value);
              
            	if(!obj._index[prop]) {

              	obj._index[prop] = {
                	pos: obj._data.keys.length - 2,
                  len: value.length
                };

                obj._data.push(obj._data.keys.length - 2,  value);
                obj._index[prop].pos = obj._data.keys[obj._index[prop].pos];
              }
              else {
                const realIndex = obj._data.keys.indexOf(obj._index[prop].pos);
                obj._data.deleteRange(realIndex, obj._index[prop].len);
              	obj._index[prop].len = value.length;
                obj._data.push(realIndex, value);
                obj._index[prop].pos = obj._data.keys[realIndex];
              }
            	return true;
            }
        }
    });
  }
}

export default HermJsonDoc;