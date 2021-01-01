const store = require('./keyvalue');

class StoreInstance {
  path = null;
  constructor(path) {
    this.path = path
  }
  instance() {
    store.instance(this.path).catch(err => console.log(err));
  }
}


class CreateData {
  key = null
  value = null
  ttl = null
  constructor(key,value,ttl) {
    this.key = key;
    this.value = value;
    this.ttl = ttl;
  }
  async create() {
    await store.create(this.key , this.value , this.ttl).catch(err => console.log(err));
  }
}

class ReadData {
  key = null
  constructor(key) {
    this.key = key;
  }
  async read() {
    await store.read(this.key).then(res => {console.log(res)}).catch(err => console.log(err));
  }
}

class DeleteData {
  key = null
  constructor(key) {
    this.key = key;
  }
  async read() {
    await store.deletekey(this.key).then(res => {console.log(res)}).catch(err => console.log(err));
  }
} 
module.exports = {StoreInstance , CreateData , ReadData, DeleteData};