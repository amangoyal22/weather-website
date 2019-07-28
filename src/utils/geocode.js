const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2F5dXJlbWFpbCIsImEiOiJjanlpdnhxcXkwNTdrM2JyMmlmd3AybnJmIn0.p9MgKGQ2d44y0lE8Kb1TSA'
    request({url,json:true},(error,{body}) => {
        //console.log(response.body)
        if(error){
            callback('Unable to connect',undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find location',undefined)
        } else {
        //const data = JSON.parse(JSON.stringify(body))
        const geoCode = {
            lon : body.features[0].center[1],
            lat : body.features[0].center[0],
            location : body.features[0].place_name
        }
        callback(undefined,geoCode)
        }
    })
}

module.exports = geocode