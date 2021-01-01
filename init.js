const synchronus = require('./syncKeystroe');
const store = () => {
  synchronus.instance().catch(err => rej(err));
  return true;
}
store();
