const keystore = require('./keyvalue');
//i'm following the singleton approach
keystore.instance();
keystore.read("fod")