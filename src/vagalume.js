const vagalumeConfig = require('./configs/vagalume.config')
const removeNewLine = require('newline-remove');
const fetch = require('node-fetch')
const URL_BASE = "https://api.vagalume.com.br/search.php";

const prefix = '[vagalume] -> ';
async function start(artist, tracks){
     console.log(`${prefix}starting to fetch lyric on vagalume of  ${artist} - ${tracks.length} tracks`);

     return new Promise((resolve,reject) => {
        Promise.all(tracks.map(async track => {
            return await getLyric(artist, track);
         }))
         .then(results => {
            results.forEach(result => {
                for (let index = 0; index < tracks.length; index++) {
                    if(tracks[index].name == result.name){
                        tracks[index].lyric = result.lyric;
                    }
                }
            });
             console.log(`${prefix} got all ${results.length} results`);
             resolve(tracks);
         })
     });
     
}

async function getLyric(artist, track){
    const url = URL_BASE + `?art=${artist}&mus=${track.name}&apikey=${vagalumeConfig.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if(data.mus){
        track.lyric = returnLyric(data);
        return track;
    }else{
        return track;
    }
    
}

function returnLyric(data){
    let lyric = data.mus[0].text;
         return removeNewLine(lyric);
}

module.exports = start;