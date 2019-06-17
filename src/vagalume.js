const vagalumeConfig = require('./configs/vagalume.config')
const removeNewLine = require('newline-remove');
const fetch = require('node-fetch')

const URL_BASE = "https://api.vagalume.com.br/search.php";

const prefix = '[vagalume] -> ';


async function start(album){

    album.tracks = await Promise.all(album.tracks.map(async (track) => await getLyric(album.artist, track)));
    return album;
}

async function getLyric(artist, track){
    const url = URL_BASE + `?art=${artist}&mus=${track.name}&apikey=${vagalumeConfig.apiKey}`;
    

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.mus){
            track.lyric = returnLyric(data);
            return track;
        }else{
            return track;
        }

    } catch (error) {
        return track;
    }
}

function returnLyric(data){
    let lyric = data.mus[0].text;
         return removeNewLine(lyric);
}

module.exports = start