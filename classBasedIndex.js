const {StoreInstance , CreateData , ReadData , DeleteData} = require('./classes');

new StoreInstance('/store/').instance();
const createInitData = async() => {
  await new CreateData("code" , {"code" : "code"} , 30000).create();
  await new CreateData("code1" , {"code" : "code"} , 30000).create();
  await new CreateData("code2" , {"code" : "code"} , 30000).create();
}

const ReadInitData = async() => {
  await new ReadData("code").read();
}
createInitData().catch(err => console.log(err));
//ReadInitData();