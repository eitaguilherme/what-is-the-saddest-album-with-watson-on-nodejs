const fetch = require('node-fetch');
const configuration = require('./configs/lastfm.config');

const prefix = "[lastfm] > ";

async function start(album, artist){
    const url_getInfoAlbum = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${configuration.key}&artist=${artist}&album=${album}&format=json`;

    const response = await fetch(url_getInfoAlbum);
    const data = await response.json();

    return {
        name: album,
        artist: artist,
        tracks: ToTracks(data)
    };
}

function ToTracks(data){
    try {
        if(data.album.tracks){
            return data.album.tracks.track.map(track => {
                return {
                    name: track.name,
                    sentimentPoint: 0,
                    emotionPoint: 0,
                    lyric: ''
                };
            })
        }    
    } catch (error) {
        return '';
    }
}

module.exports = start;