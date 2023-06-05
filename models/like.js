const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    //Defines the Onject ID of Liked Object
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //Type of the Linked Object since this is a dynamic reference
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true,
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;