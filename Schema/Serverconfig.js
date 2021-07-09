const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    id: String,
    ServerOwner: String,
    ServerName: String,
    Members: String
});

module.exports = mongoose.model('ServerConfig', ServerSchema);