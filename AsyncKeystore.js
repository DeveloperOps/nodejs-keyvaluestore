const fs = require('fs');
const move = require('move-file');
const sizeOf = require('object-sizeof');
const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config();

const createData = (object) => {
  fs.writeFileSync(`${process.env.STORE}` , JSON.stringify(object) , (err) => {
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

const constructGlobal = () => {
  fs.appendFile("global.json" , JSON.stringify({ set: __dirname }) , (err) => {
    if(err) throw err;
    move("global.json" , 'C://globalKey/global.json')
    .then(()=>{ console.log("Instance generated!") })
    .catch(err => { throw err });
  });
}

const readGlobal = () => {
  return new Promise((resolve , reject) => {
    fs.readFile("C://globalKey/global.json" , (err , data) => {
      if(err) {resolve(false); return;}
      const jObj = JSON.parse(data);
      resolve(jObj.set);
    })
  });
}


const keystore = {
  instance: async(path = "/keystore/") => {
  const global = await readGlobal();
  if(global === false) constructGlobal();
  else if(!global === __dirname) return {err: "Data store already initialized"};
  if(process.env.STORE === undefined) {
      fs.appendFile("keystore.json" , JSON.stringify({}) , (err) => {
        if(err) throw err;
        move("keystore.json" , __dirname +`${path}keystore.json`)
        .then(()=>{ 
         fs.appendFile(".env" , `STORE = ${__dirname}${path}keystore.json` , (err) => { 
            if(err) throw err;
            console.log("File created!!");
            return true;
          });
        })
        .catch(err => { throw err });
      });
    }else{
      console.log("Store already initialized!!");
      return true;
    }
  },
  create: (key , value , ttl = null) => {
    return new Promise((resolve , reject) => {
      if(key.length > 32) reject("Key must be smaller than 32 chars");
      if(sizeOf(value) > 128000) reject("Value must be less than 16KB in size");
      const stats = fs.statSync(`${process.env.STORE}`);
      if(stats) {
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        if(fileSizeInMegabytes > 1000) reject("Store limit exceeded(capped to 1GB only)")
      }

      fs.readFile(`${process.env.STORE}` , (err , data) => {
        if(err) reject(err);
        const json = JSON.parse(data);
        if(json[key]) {
          if(checkTTL(json,key)) {
            if(ttl !== null) value["ttl"] = Date.now() + ttl;
            json[key] = value;
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
      fs.readFile(`${process.env.STORE}` , (err , data) => {
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
  deletekey: (key) => {
    return new Promise((resolve , reject) => {
      if(key.length > 32) throw new Error("Key must be smaller than 32 chars");
      fs.readFile(`${process.env.STORE}` , (err , data) => {
        if(err) reject(err);
        const json = (JSON.parse(data));
        if(json[key]) delete json[key];
        else return resolve("Key not found!!");
        fs.writeFile(`${process.env.STORE}` , JSON.stringify(json) , (err) => {
          if(err) reject(err);
          resolve("Deleted");
        })
      });
    })
  }
};
  
module.exports = keystore;