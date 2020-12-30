const fs = require('fs');
const move = require('move-file');

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

    const create = () => {
      
    }

}
module.exports = keystore;