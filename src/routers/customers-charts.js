const express =  require('express')
const router = new express.Router()
const customerRequestsHelper = require('../requests/portal-customer-request')
const customerServicesHelper = require('../services/customer-services')
let currentLimit = 200

router.get('/monthlyeffort', async(req,res) => {
    try {
        let customers = await customerRequestsHelper.customerRequests()
        let finalCustomers = await customerServicesHelper.customerFilter(customers, currentLimit)
        let finalCustStr = JSON.stringify(finalCustomers)
        return res.render('piechart', {
            customers: finalCustStr,
            limit: currentLimit
        })
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/monthlyeffort', async(req,res) => {
    try {
        if(req.body.lowerlimit >= 0){
            currentLimit = req.body.lowerlimit
        } 
        return res.redirect('/monthlyeffort')
    } catch(e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

module.exports = router