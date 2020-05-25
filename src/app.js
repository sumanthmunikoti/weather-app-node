const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

const viewsPath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sumanth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Sumanth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Sumanth',
        message: 'Help me. End this game!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        }) 
    } 

    geoCode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
           return res.send({ error })
        }

        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({ 
                location,
                response
             })
        })

    })
    
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Sumanth',
        message: 'You need 404 help. Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Sumanth',
        message: '404 bro'
    })
})

app.listen(port, () => {
    console.log('Server up!')
})