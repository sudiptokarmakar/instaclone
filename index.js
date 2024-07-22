const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat_db");
}
main()
.then((res)=>{
    console.log("mongo server connected");
});

const Chat = require("./models/chat_schema.js");

app.get("/",(req,res)=>{
   console.log("helo");
});
app.get("/show",(req,res)=>{
    Chat.find()
    .then(re=>{
        res.render("index.ejs",{re})
    });
});
app.get("/create",(req,res)=>{
    res.render("create.ejs")
})
app.post("/create",(req,res)=>{
    let {from,to,msg,date} = req.body;
    let new_chat=new Chat({
        from:from,
        to:to,
        msg:msg,
        date:new Date()
    });
    new_chat.save()
    .then(()=>{

        res.redirect("/show");    
    })
})
app.post("/show/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    Chat.findByIdAndDelete(id)
    .then((re)=>{
        res.redirect("/show"); 
    })
    
})
app.get("/edit/:id",async(req,res)=>{
    let {id}= req.params;
    // console.log({id});
    await Chat.findById(id)
    .then(re=>{
     res.render("edit.ejs",{re});
    })
})
app.post("/edit/:id",async(req,res)=>{
    let {id}= req.params;
    let{from,to,msg,date}=req.body;
    // console.log(id);
    await Chat.findByIdAndUpdate(id,{from,to,msg,date})
    .then(re=>{
     res.redirect("/show");
    })
})

app.listen(3000,()=>{
    console.log("express server sonnected");
});