const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: 'd54d83f323604362889ea096bfb223a5',
    clientSecret: '51ed96a4fa5245f5952cfeff8cec1f43',
    redirectUri: 'http://localhost:8888/callback'
});

const prefix = '[spotify] -> ';
const vagalume = require('./vagalume');

