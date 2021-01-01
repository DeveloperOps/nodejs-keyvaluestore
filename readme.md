#
# Node js Keyvalue store
    -Note 1 - Make sure to use async/await for multiple asynchronus calls
    -Note 2 - Specifically for windows os
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

