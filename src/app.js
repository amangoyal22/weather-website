const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
//utils
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

//Define path for config
const publicDirec = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

//Setup for handle bars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//set  up static Dir to serve
app.use(express.static(publicDirec))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'Aman Goyal '
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Aman',
        helpText : 'This is some helpful text'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name : 'Aman Goyal '
    })
})



app.get('/weather',(req,res)=>{
    if(! req.query.search){
        res.send({
            error : 'You must provide the Address System'
        })
    } else {
 
        geocode(req.query.search, (error,{lat,lon ,location} = {} ) => {
            if (error) {
                return res.send({error})
            }

            forcast(lat,lon,(error,summary)=> {
                if (error) {
                    return res.send({error})
                }

                res.send({
                    forcast: summary,
                    location,
                    address: req.query.search
                })
            })
        })
        // res.send({
        //     forcast : 'Its snowning',
        //     location : 'Jaipur',
        //     address : req.query.search
        // })
    }
    
})

// app.get('/products',(req,res) => {
//     console.log(req.query)
    
// })

app.get('/help/*',(req,res)=>{
    res.send('Help Article not availabe')
})

app.get('*',(req,res)=>{
    res.send("MY 404 page")
})

app.listen(port,() => {
    console.log('server is up on' + port)
} )

