// customers should be an array
const customerFilter = async function(customers, limit) {
    try {
        let finalCustomers = []
        customers = customers.filter( cust => cust.totalQuarterlyEffortHours !== 0)
        toBeDisplayed = customers.filter( cust => cust.totalQuarterlyEffortHours > limit )

        await Promise.all(toBeDisplayed.map( (customer) => {
            let newObj = {}
            newObj.name = customer.name
            newObj.monthlyHour = (customer.totalQuarterlyEffortHours / 3 )
            finalCustomers.push(newObj)
        }))

        return finalCustomers
    } catch (e) {
        console.log(e)
    }
}

const customerUnitPriceFilter = async function(customers, paramCurrency) {
    try {
        let finalCustomers = []
        customers = customers.filter( customer => customer.sensorUnitPrice !== 0 )
        toBeDisplayed = customers.filter ( customer => customer.currency === paramCurrency )
        
        await Promise.all(toBeDisplayed.map( (customer) => {
            let newObj = {}
            newObj.name = customer.name
            newObj.sensorUnitPrice = Math.round(customer.sensorUnitPrice)
            finalCustomers.push(newObj)
        }))
        return finalCustomers
    } catch (e) {
        console.log(e)
    }
}

const customerIndustryFilter = async function(customers) {
    try {
        let finalCustomers = []
        customers = customers.filter( customer => customer.industry !== '' )
        await Promise.all( customers.map( (customer) => {
            let newObj = {}
            newObj.name = customer.name
            newObj.industry = customer.industry
            finalCustomers.push(newObj)
        }))
        return finalCustomers
    } catch (e) {
        console.log(e)
    }
}

module.exports = { 
    customerFilter,
    customerUnitPriceFilter,
    customerIndustryFilter
}


