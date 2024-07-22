const mongoose = require("mongoose");
const chat_schema = mongoose.Schema({
    from:String,
    to:String,
    msg:String,
    date:Date
});
const Chat_model = mongoose.model("Chat_model",chat_schema);
module.exports=Chat_model;