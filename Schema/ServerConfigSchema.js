const mongoose = require('mongoose');

const ServerConfig = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        Unique: true,
    },
    prefix: {
        type: String,
        default: "!"
    },
    AdminRole:{
        type: String,
        default: null
    },
    MuteRole:{
        type: String,
        default: null
    },
    MemberJoinChannel: {
        type:String,
        default: null
    },
    MemberCount: {
        type:String,
        default: "0"
    },
    ServerOwner: String
});

module.exports = mongoose.model('ServerConfig', ServerConfig);