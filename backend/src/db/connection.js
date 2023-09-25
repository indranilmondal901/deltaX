const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Your DB is sucessfully connected with Node.js")
}).catch((err)=>{
    console.log("Failed in Connting to DB due to => " + err)
})
