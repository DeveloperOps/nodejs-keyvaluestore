const fs = require('fs');
const move = require('move-file');
const sizeOf = require('object-sizeof');
const dotenv = require('dotenv');
dotenv.config();

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
  create: (key , value) => {
    if(key.length > 32) throw new Error("Key must be smaller than 32 chars");
    if(sizeOf(value) > 128000) throw new Error("Value must be less than 16KB in size");
    fs.readFile(`${__dirname}/keystore/keystore.json` , (err , data) => {
      if(err) throw err;
      const json = (JSON.parse(data));
      json[key] = value;
      fs.writeFile(`${__dirname}/keystore/keystore.json` , JSON.stringify(json) , (err) => {
        if(err) throw err;
        console.log("Written");
      })
    })
  },
  read: (key) => {
    if(key.length > 32) throw new Error("Key must be smaller than 32 chars");
    fs.readFile(`${__dirname}/keystore/keystore.json` , (err , data) => {
      if(err) throw err;
      const json = (JSON.parse(data));
      if(json[key]) console.log(json[key])
      else console.error("Not found!!");
    })
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