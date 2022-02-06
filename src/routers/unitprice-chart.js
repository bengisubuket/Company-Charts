const express = require('express')
const router = new express.Router()
const customerRequestsHelper = require('../requests/portal-customer-request')
const customerServicesHelper = require('../services/customer-services')
let currentCurrency = 'USD'

router.get('/unitprice', async(req,res) => {
    try {
        let customers = await customerRequestsHelper.customerRequests()
        let finalCustomers = await customerServicesHelper.customerUnitPriceFilter(customers, currentCurrency)
        finalCustomers.sort(function(a,b) {
            return parseFloat( Number(a.sensorUnitPrice) ) - parseFloat( Number(b.sensorUnitPrice))
        })
        let finalCustStr = JSON.stringify(finalCustomers)
        return res.render('unirprice-columnchart', {
            customers: finalCustStr,
            currency: currentCurrency
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/unitprice', async(req,res) => {
    try {
        currentCurrency = req.body.currency
        return res.redirect('/unitprice')
    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

module.exports = router