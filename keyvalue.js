const fs = require('fs');
const move = require('move-file');
const sizeOf = require('object-sizeof');
/**
 * @param {String} path
 * Optional: please specify location ie /store/ 
 * Default: /projectRoot/keystore/
 */
const keystore = (path = "/keystore/") => {
    fs.appendFile("keystore.json" , '' , (err) => {
      if(err) throw err;
      move("keystore.json" , __dirname +`${path}keystore.json`)
      .then(()=>{ console.log(`File created at ${path}`) })
      .catch(err => { throw err });
    });

    const create = (key , value) => {
      if(key.length > 32) throw new Error("Key must be smaller than 32 chars");
      if(sizeOf(value) > 128000) throw new Error("Value must be less than 16KB in size");
         
    }
  }
module.exports = keystore;