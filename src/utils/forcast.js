const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = 'https://api.darksky.net/forecast/2eea7324ec965488f6aa2539042dd121/'+lat+','+lon+'?lang=en'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect',undefined);
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            //const data = JSON.parse(JSON.stringify(body))
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast