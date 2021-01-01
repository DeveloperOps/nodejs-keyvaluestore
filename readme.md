# Node js Keyvalue store
    -Run npm install to install required dependencies
    -Note 1 - Make sure to intialize your store before executing any other apis (ie check init.js);
    -Note 2 - Make sure to use async/await for multiple asynchronus calls
    -Note 3 - Supported for windows os

# Main Files
    -syncKeystore.js (Test file SyncIndex.js)
    -AsyncKeystore.js (Test file Asyncindex.js)
    -classes.js (Test file classBasedIndex.js)


# SyncKeystore
    - Instance api - This api is asynchronus after success you can work with all the apis

# AsyncKeystore
    - All apis are asynchronus have to use async await for better results

# Class Based
    - All Asynchronus apis in a class to use them as an object

# Properties
    - Creates .env file to store location of store file
    - Create a global config file inside your C://globalKey/global.json to ensure that no other project can use the same api again.
    - There are three methods in both versions ie create , read , delete
    - Key is capped upto 32 chars and value is upto 16kb
    - Store file size capped upto 1GB

# Key store API
    -Main utils file => keyvalue.js 

# There are two ways to use this util file:
    -Normally import the lib and use object apis ie (create, read, deletekeys);
    -Once you initialize your keystore then you cannot use it for other projects
    -Another way is to use classes.js file which is a class based approch to use this util just import and use.

# create
    -This will take three params ie 
      -key (capped upto 32 chars) 
      -value (json/normal js object capped upto 16kb)
      -ttl (time to live value in miliseconds optional)

# read
    -Pass key it will log the value from store
    -Note throws error if ttl expired

# deletekeys
    -Pass key it will delete the value from store

# Steps to execute 
    - Run init.js file to initialize your store.
    - After initialization import Synckeystore or Asynckeystore in your main.js file 
    - I'm moving further with Syncstore (Check SyncIndex.js)
    - After importing the store you can use all the apis (See SyncIndex.js)
