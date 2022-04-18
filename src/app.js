const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/app')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sumit Dutta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address/location!'
        })
    }

    const location = req.query.address
    forecast(location, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        res.send({
            location,
            data
        })
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})