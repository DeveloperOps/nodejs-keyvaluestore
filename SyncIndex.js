const synchronus = require('./syncKeystroe');
synchronus.create("code1" , {code: "coding"} , 20000);
synchronus.create("code2" , {code: "coding"} , 20000);
synchronus.create("code3" , {code: "coding"} , 20000);
synchronus.read("code1");
synchronus.read("code2");
synchronus.read("code3");
synchronus.deletekey("code3");
synchronus.deletekey("code1");