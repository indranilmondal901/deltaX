const express = require('express');
const router = express.Router();

const {AddArtist,GetArtist} = require("../controller/artistRouteController")

/* TEST ROUTE */
router.get("/test",(req,res)=>{
    res.send("artist route working")
})

//ADD ARTIST (CREATE)
router.post("/addArtist",AddArtist);

//GET ARTIST (READ)
router.get("/getArtist",GetArtist);


module.exports = router;