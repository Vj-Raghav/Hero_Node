const mongoose = require('mongoose');

let models={}

const APISchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'Id is needed']
    },
    name: {
        type: String,
        required: [true, 'Name is needed']

    },
    dob: {
        type: String,
        required: [true, 'Date of birth is needed']
    },
    accDetails: [{
        accountNum: { type: Number, required: [true, "Account num is needed"] },
        ifsc: { type: String, required: [true, "ifsc num is needed"] },
        branch: { type: String, required: [true, "branch num is needed"] },
        balance: { type: Number, required: [true, "balance num is needed"] }
    }],
    depositAmount: {
        type: Number,
        select: false
    }
})

models.Bank = new mongoose.model("Bank", APISchema)

const transactionSchema = new mongoose.Schema({
    transferHistory: [{
        date: {
            type: Date,
            default: Date.now()
        },
        toAccount: { type: Number },
        fromAccount: { type: Number },
        amount: { type: Number },
        comments: { type: String }
    }]
})

models.Transaction = new mongoose.model("Transaction", transactionSchema)


module.exports = models;
