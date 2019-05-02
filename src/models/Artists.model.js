const mongoose = require('mongoose');

const ArtistModel = mongoose.model('Artist', new mongoose.Schema({
    name: String,
    albums: [],
}))

module.exports = ArtistModel;