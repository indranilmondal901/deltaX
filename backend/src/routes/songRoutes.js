const express = require('express');
const router = express.Router();

const {AddNewSong,GetSongs, UpdateSong} = require("../controller/songRouteController");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

/* TEST ROUTE */
router.get("/test",(req,res)=>{
    res.send("song route working")
})

//ADD SONG (CREATE)
router.post("/addNewSong", upload.single('artwork'),AddNewSong);

//GET SONG (READ)
router.get("/getSongs",GetSongs);

//Update

router.patch("/updateSong",UpdateSong)

module.exports = router;