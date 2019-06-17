const mongoose = require('mongoose');
const readline = require('readline');

const lastfm = require('./lastfm');
const vagalume = require('./vagalume');

const prefix = '[index] -> ';

async function fetchAlbums(){
    return [{ 'name': 'ok computer', 'artist': 'radiohead', 'tracks' : [] }, { 'name': 'the bends', 'artist': 'radiohead', 'tracks' : [] }];
}

async function start(){
    console.log(`${prefix} starting engines`);
    console.log(`${prefix} just kidding, lets start`);

    var albums = await fetchAlbums();
    
    albums.forEach(async (album) =>  {
        album.tracks = await lastfm('ok computer', 'radiohead');
    });

    albums = await Promise.all(albums.map(async album => {
        album = await lastfm(album.name, album.artist);
        album = await vagalume(album);

        return album;
    }));
    console.log(`${prefix} ok, now we have the data, here we go (aqui nois vai)`);
};

start();





