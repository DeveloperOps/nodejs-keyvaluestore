const fs = require('fs');
const move = require('move-file');
const sizeOf = require('object-sizeof');
const dotenv = require('dotenv');
dotenv.config();

const createData = (object) => {
  fs.writeFile(`${__dirname}/keystore/keystore.json` , JSON.stringify(object) , (err) => {
    if(err) throw err;
    console.log("written");
  });
}

const checkTTL = (json , key) => {
  if(json[key].ttl < Date.now()) {
    delete json[key];
    createData(json);
    return true;
  }
  return false;
}


const keystore = {
  instance: (path = "/keystore/") => {
  if(process.env.STORE === undefined) {
      fs.appendFile("keystore.json" , {} , (err) => {
        if(err) throw err;
        move("keystore.json" , __dirname +`${path}keystore.json`)
        .then(()=>{ 
          fs.appendFile(".env" , `STORE = ${__dirname}${path}keystore.json` , (err) => {
            if(err) throw err;
            console.log("File created!!");
          });
        })
        .catch(err => { throw err });
      });
    }
  },
  create: (key , value , ttl = null) => {
    return new Promise((resolve , reject) => {
      if(key.length > 32) reject("Key must be smaller than 32 chars");
      if(sizeOf(value) > 128000) reject("Value must be less than 16KB in size");
      fs.readFile(`${__dirname}/keystore/keystore.json` , (err , data) => {
        if(err) reject(err);
        const json = JSON.parse(data);
        if(json[key]) {
          if(checkTTL(json,key)) {
            json[key] = value;
            console.log(json);
            createData(json);
            return;
          }
          reject("key already exists")
          return;
        }
        if(ttl !== null) value["ttl"] = Date.now() + ttl;
        json[key] = value;
        createData(json);
        resolve(true);
      });
    });
  },
  read: (key) => {
    return new Promise((resolve , reject) => {
      if(key.length > 32) reject("Key must be smaller than 32 chars");
      fs.readFile(`${__dirname}/keystore/keystore.json` , (err , data) => {
        if(err) reject(err);
        const json = (JSON.parse(data));
        if(json[key]){
          if(json[key].ttl){
            const ttlResult = checkTTL(json , key);
            if(ttlResult){ resolve("Data Expired"); return; }
          }
          resolve(json[key]);
        }
        else resolve("Not found!!");
      });
    });
  },
  delete: (key) => {
    if(key.length > 32) throw new Error("Key must be smaller than 32 chars");
    fs.readFile(`${__dirname}/keystore/keystore.json` , (err , data) => {
      if(err) throw err;
      const json = (JSON.parse(data));
      if(json[key]) delete json[key];
      else return console.error("Key not found!!");
      fs.writeFile(`${__dirname}/keystore/keystore.json` , JSON.stringify(json) , (err) => {
        if(err) throw err;
        console.log("Deleted");
      })
    })
  }
};
  
module.exports = keystore;