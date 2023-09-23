const express = require('express');
const router = express.Router();

const {AddNewSong,GetSongs, UpdateSong} = require("../controller/songRouteController")

/* TEST ROUTE */
router.get("/test",(req,res)=>{
    res.send("song route working")
})

//ADD SONG (CREATE)
router.post("/addNewSong",AddNewSong);

//GET SONG (READ)
router.post("/getSong",GetSongs);

//Update

router.patch("/updateSong",UpdateSong)

module.exports = router;