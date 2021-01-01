const keystore = require('./AsyncKeystore');
const {instance , create , read , deletekey} = keystore;

//Instance
instance().catch(err => console.log(err));

//create values
const createfunc = async() => {
  try {
    await create("code6" , {coding :"code"} , 120000)
    await create("code5" , {coding :"code"} , 120000)
    await create("code1" , {coding :"code"} , 120000)
    await create("code2" , {coding :"code"} , 120000)
    await create("code3" , {coding :"code"} , 120000)
    await create("code4" , {coding :"code"} , 120000)
  } catch (error) {
    console.log(error);
  }
}


//read values
const readData = async() => {
  try {
    const val = await read("code4");
    console.log(val);
  } catch (error) {
    console.log(error)
  }
} 

//readData().catch(err => console.log(err));

// delete Keys
const deletekeys = async() => {
  try {
    await deletekey("code1")
  } catch (error) {
    console.log(error);
  }
}

//  deletekeys().catch(err => {console.log(err)});