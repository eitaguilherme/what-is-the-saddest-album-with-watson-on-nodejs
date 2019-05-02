const mongoose = require('mongoose');
const ArtistModel = require('./models/Artists.model');

const input = require('./input');
const lastfm = require('./lastfm');
const vagalume = require('./vagalume');
const watson = require('./watson');

const prefix = '[index] -> ';

mongoose.connect('mongodb://localhost:27017/teste', { useNewUrlParser: true }, (error) => {
    if(error){
        console.log(`${prefix} error on mongodb`);
        console.log(`${prefix} stoped process`);
        process.exit(1);
    }else{
        console.log(`${prefix} database connected`);
    }
})

function sumSentimentalPoints(points){
    let sum = 0;
    points.forEach(point => sum += point);
    return sum;
}

console.log(`${prefix}fetching artists`);

async function start(){
    input()
    .then(artists => {
        artists.map(async artist => {
            artist.albums.map(async album => {
                console.log(`${prefix}looking for ${album.name} on ${artist.name}`);
                album.tracks = await lastfm(album.name,artist.name);
        
                vagalume(artist.name, album.tracks)
                    .then(tracksWithLyrics => {
                        album.tracks = tracksWithLyrics;
        
                        watson(album.tracks)
                            .then(result => {
                                album.tracks = result;
                                for (let i = 0; i < artists.length; i++) {          

                                    if(artists[i].name == artist.name){
                                        
                                        for (let j = 0; j < artists[i].albums.length; j++) {
                                            if(artists[i].albums[j].name == album.name){
                                                artists[i].albums[j] = album;
                                            }
                                        }
                                        const artistNew = new ArtistModel({
                                            name: artists[i].name,
                                            albums: artists[i].albums
                                        });
                                        artistNew.save();    
                                    }
                                }
                            })
                    });
            });
        });
    })
}

start();




