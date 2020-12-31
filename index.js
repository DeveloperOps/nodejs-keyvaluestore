const keystore = require('./keyvalue');
const { create , read } = keystore;
//i'm following the singleton approach
keystore.instance();
async function createValues() {
 await create("code" , {"val1": "val1"} , 60000)
 await create("code2" , {"val1": "val1"})
 await create("code3" , {"val1": "val1"})
 await create("code4" , {"val1": "val1"})
} 
createValues()