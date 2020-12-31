const keystore = require('./keyvalue');
//i'm following the singleton approach
const {instance} = keystore;
const localintance = async() => {
  await instance();
}
localintance();