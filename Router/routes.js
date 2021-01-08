const express = require('express');
const apiHandler = require('../Handler/apiHandler');
const authHandler = require('../Handler/authHandler');
const checkAuth = require('../Utilities/check-auth')

const router = express.Router();

router.post('/create',checkAuth,apiHandler.createCustomer);
router.put('/AddNewAccount',checkAuth,apiHandler.addAccountDetails)
router.put('/balanceTransfer',checkAuth,apiHandler.balanceTransfer)
router.get('/fetchBalance/:accountNum',checkAuth,apiHandler.getBalance)
router.get('/fetchTransferHistory/:accountNum',checkAuth,apiHandler.transHistory)
router.route('/login').post(authHandler.login);
router.route('/signup').post(authHandler.signup)
router.all("*",(req, res, next) => {
    let err = new Error("Invalid Path")
    err.statusCode = 400
    next(err)
})


module.exports = router;