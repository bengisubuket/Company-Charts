const organizationFilter = async function( organizations ) {
    try{
        let finalOrganizations = []
        
        await Promise.all(organizations.map((organization) => {
            let newObj = {}
            newObj.name = organization.name
            newObj.country = organization.refCountry
            finalOrganizations.push(newObj)
        }))
        return finalOrganizations
    } catch(e) {
        console.log(e)
    }
}

module.exports = { organizationFilter }