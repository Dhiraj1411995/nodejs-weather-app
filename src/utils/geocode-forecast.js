const request=require('request')
debugger
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGhpcmFqMTQxMTk5NSIsImEiOiJjazFic2J5bncwZ25tM2JycmF5eXBhdmM0In0.HWfE6d32o5KXqV9rFTkuQQ&limit=100'
    request({url,json:true},(error,{body})=>{//request({url:url,json:true},(error,response)=>{
        
        if(error){
            callback('unable to connect to the internet',undefined)
        }
        else if(body.features.length===0){//else if(response.body.features.length===0){
            callback('unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],//longitude:response.body.features[0].center[0],
                latitude:body.features[0].center[1],//latitude:response.body.features[0].center[1],
                location:body.features[0].place_name//location:response.body.features[0].place_name
            })
        }
    })
}

const forecast=(lat,lon,callback)=>{
    const url='https://api.darksky.net/forecast/d41988f37c2500b4df0e5de8f0336686/'+lat+','+lon+'?units=si'
    request({url,json:true},(error,{body})=>{//request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to the internet',undefined)
        }
        else if(body.error){//else if(response.body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,`the current climate state: ${body.currently.summary} It is ${body.currently.temperature} and there is ${body.currently.precipProbability}% chance of rain.`)
        }                                                  //${response.body.currently.summary}     ${response.body.currently.temperature}              ${response.body.currently.precipProbability}
    })
}

module.exports={
    geocode,//geocode=geocode
    forecast//forecast=forecast
}

