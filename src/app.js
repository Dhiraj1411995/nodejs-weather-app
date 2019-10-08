const path=require('path')
const express=require('express')
const geocode_forecast=require('./utils/geocode-forecast.js')
const app=express()

const staticPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../views')

console.log(staticPath)
console.log(__dirname)
console.log(__filename)

app.use(express.static(staticPath))

app.set('view engine','hbs')
app.set('views',viewsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'my webpage',
        name:'dhiraj kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'my webpage',
        name:'dhiraj kumar pathak'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'my webpage',
        name:'dhiraj kumar'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'search item not available'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'u didn\'t provide any address to find the weather forecast'
        })
    }
    // res.send({
    //     forecast:'it is clear day',
    //     address:req.query.address
    // })

    geocode_forecast.geocode(req.query.address,(err,{latitude,longitude,location}={})=>{//geocode.geocode(addr,(err,data)=>{
        if(err){
            return res.send({
                error:err
            })
        }
        else{
            geocode_forecast.forecast(latitude,longitude,(error,forecastdata)=>{//geocode.forecast(data.latitude,data.longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                    res.send({
                        location,//console.log(data.location)
                        forecast:forecastdata,
                        address:req.query.address
                })
                }
            })
        }
    })

})
app.listen(3000,()=>{
    console.log('server starts')
})