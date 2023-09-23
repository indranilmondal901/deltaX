const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.PORT);
const DB_URL = "mongodb+srv://indranilmondal901:Abcd1234@cluster0.vqrb0fs.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Your DB is sucessfully connected with Node.js")
}).catch((err)=>{
    console.log("Failed in Connting to DB due to => " + err)
})