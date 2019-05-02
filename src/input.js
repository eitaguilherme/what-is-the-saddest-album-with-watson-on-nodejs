const mongoose = require('mongoose');

const artistsToStart = [
    { name: 'Radiohead', albums: [ { name: 'Ok Computer', watsonResponse: { }, tracks: [] } ] },
    { name: 'Morphine', albums: [ { name: 'Cure for pain', sentimentalPoints: 0, tracks: [] } ] },
    { name: 'Green Day', albums: [ { name: 'American Idiot', sentimentalPoints: 0, tracks: [] } ] }
];

const ArtistData = require('./models/Artists.model');

async function start(){

    return new Promise((resolve,reject) => {
        ArtistData.find({}, (err, artists) => {
            console.log(artists);
            if(artists.length == 0){
                resolve(artistsToStart);
            }else{
                resolve(artists);
            }
        })
    })
};



module.exports = start;