const express = require('express')
const router = new express.Router()
const customerRequestsHelper = require('../requests/portal-customer-request')
const customerServicesHelper = require('../services/customer-services')

router.get('/industries', async(req,res) => {
    try {
        let customers = await customerRequestsHelper.customerRequests()
        let finalCustomers = await customerServicesHelper.customerIndustryFilter( customers )
        let finalCustStr = JSON.stringify(finalCustomers)

        let industiresArray = []
        finalCustomers.forEach( (customer) => {
            if ( !industiresArray.includes(customer.industry) ) {
                if(customer.industry){
                    industiresArray.push(customer.industry)
                }
            }
        })

        let finalIndustriesArray = []
        industiresArray.forEach((industry) => {
            let numOfCustomer = 0
            let tempJSON = {}
            finalCustomers.forEach((customer) => {
                if( customer.industry === industry ) {
                    numOfCustomer += 1
                }
            })
            tempJSON.name = industry
            tempJSON.numOfCustomer = numOfCustomer
            finalIndustriesArray.push(tempJSON)
        })

        let finalEndStr = JSON.stringify(finalIndustriesArray)
        
        return res.render('industries-piechart', {
            customers: finalCustStr,
            industries: finalEndStr
        })

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router