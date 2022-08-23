const express = require('express')
const shortid = require('shortid')
const cors = require('cors')

const { getAppsFromDB, getAppsByNameFromDB, addAppToTheDB, deleteAppFromDB } = require('./utiles.js')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/appsCenter', async (req, res) => {
    const apps = await getAppsFromDB()
    res.send(apps);
})

app.get('/api/appsCenter/:tag', async (req,res) => {

    const specificparkingSpots = await getAppsByNameFromDB(req.params.tag)

    res.send(specificparkingSpots)
})

app.post('/api/appsCenter', async(req, res) => {

    const date = new Date()  
    const newApp = {
        id: shortid.generate(),
        imgeurl: req.body.imgeUrl,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        companyname: req.body.companyname,
        createdat: date
    }

    await addAppToTheDB(Object.values(newApp))
    res.send(newApp)
})

app.delete('/api/appsCenter/:id', async(req, res) => {
    
    try{
        await deleteAppFromDB(req.params.id)
    }
    catch(e){
        res.send('failed')
    }
})

app.listen(3000, () => console.log('Server working...'))