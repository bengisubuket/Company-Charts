const express = require('express')
const router = new express.Router()
const organizationRequestHelper = require('../requests/testportal-organization-request')
const organizationServiceHelper = require('../services/organization-services')
router.get('/organizations', async(req,res) => {
    try{
        let organizations = await organizationRequestHelper.organizationRequest()
        let finalOrg = await organizationServiceHelper.organizationFilter(organizations)

        let countries = []
        finalOrg.forEach((org) => {
            if ( !countries.includes(org.country) ) {
                if ( org.country ) {
                    countries.push(org.country)
                }
            }
        })

        let finalCountries = []
        countries.forEach((country) => {
            let orgList = ""
            let numOfOrg = 0
            let tempJSON = {}
            finalOrg.forEach((org) => {
                if( org.country === country ) {
                    numOfOrg += 1
                    orgList = orgList + ", " + org.name
                }
            })
            orgList = orgList.slice(2, orgList.length)
            tempJSON.name = country
            tempJSON.numOfOrganizations = numOfOrg
            tempJSON.orgList = orgList
            finalCountries.push(tempJSON)
        })

        let finalCountriesStr = JSON.stringify(finalCountries)

        return res.render('org-geochart', {
            countries: finalCountriesStr
        })
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/organizations', async(req,res) => {
    try {
        currentCountry = req.body.country
        return res.redirect('/organizations')
    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

module.exports = router