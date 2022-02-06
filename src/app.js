const express = require('express')
require('./db/mongoose')
const piechartRouter = require('./routers/customers-charts')
const unitpriceRouter = require('./routers/unitprice-chart')
const industriesRouter = require('./routers/industries-piechart')
const organizationsRouter = require('./routers/organization-geochart')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(piechartRouter)
app.use(unitpriceRouter)
app.use(industriesRouter)
app.use(organizationsRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port) 
})
