const express = require('express');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();

//DB connection
require("./db/connection");

//router
const SongRoutes = require("./routes/songRoutes");
const ArtistRoutes = require("./routes/artistRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/v1/songs",SongRoutes);
app.use("/api/v1/artists",ArtistRoutes);

//listen(server)
app.listen(PORT, () => {
    console.log("Your Server is running on PORT no ==> " + PORT)
})