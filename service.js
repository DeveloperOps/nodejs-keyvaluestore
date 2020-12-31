const fs = require('fs');

const Service = () => {
  fs.readFile(`${__dirname}/keystore/keystore.js` , (err , data) => {
    if(err) { };
      console.log(JSON.parse(data));
  });
  setTimeout(() => {
    Service();
  } , 1000); 
}

Service();
