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
    MemberJoinChannel: {
        type:String,
        default: null
    },
    ServerOwner: String
});

module.exports = mongoose.model('ServerConfig', ServerConfig);