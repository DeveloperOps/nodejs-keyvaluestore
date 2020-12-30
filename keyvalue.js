const fs = require('fs');

const move = () => {
  
}

const keystore = (path = "./keystore/") => {
  fs.appendFile(`keystore.json` , '' , (err)  => {
    if(err) throw err;
    console.log(`File created at ${path}`);
  })
}
module.exports = keystore;