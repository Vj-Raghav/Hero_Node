const model = require('../Models/model')

let updator = {}
//Centralized update function for all updateOne operations

updator.updateFunction =async (query,value) => {
    const status = await model.Bank.updateOne(query,value)
    if(status){
        return true
    }else{
        return false
    }
}

module.exports = updator;