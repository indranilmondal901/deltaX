const Songs = require("../model/songModel");
const Artists = require("../model/artistModel");

//for uploading image
const cloudinary = require('cloudinary').v2;


// Configure Cloudinary
cloudinary.config({
    cloud_name: "dpd6shkim",
    api_key: "534426431882261",
    api_secret: "Y01q04Q4R6Obf9XVa35_o2iuyDk"
});



const AddNewSong = async (req, res) => {
    try {
        const { songName, releaseDate, artists} = req.body;

        const artistIds = JSON.parse(artists)


        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        if (result) {

            const newSong = await Songs.create({
                songName,
                releaseDate,
                artWork: result.secure_url, // Store the secure URL from Cloudinary
                artists:artistIds,
                rating: 0
            });

            console.log(newSong);

            return res.status(200).send({
                status: true,
                message: "Song Added successfully"
            });
        }

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}



// const GetSongs = async (req, res) => {
//     try {
//    const allSongs = await Songs.find();
//         const allArtists = await Artists.find();

//         const formattedSongs = allSongs.map(song => {
//             const formattedArtists = song.artists.map(artistId => {
//                 const artist = allArtists.find(a => a._id.toString() === artistId.toString());
//                 return artist ? artist.name : null;
//             });

//             const artistDetails = song.artists.map(artistId => {
//                 const artist = allArtists.find(a => a._id.toString() === artistId.toString());
//                 return artist ? artist : null;
//             });

//             return {
//                 ...song._doc,
//                 artists: formattedArtists,
//                 artistDetails: artistDetails
//             };
//         });

//         return res.status(200).send({
//             status: true,
//             data: formattedSongs
//         });

//         return res.status(200).send({
//             status: true,
//             data: formattedSongs
//         });
//     } catch (error) {
//         return res.status(500).send({
//             status: false,
//             message: error.message
//         })
//     }

// }

const GetSongs = async (req, res) => {
    try {
        const formattedSongs = await Songs.find()
            .populate('artists'); 

        return res.status(200).send({
            status: true,
            data: formattedSongs
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

const UpdateSong = async (req, res) => {
    try {
        let data = req.body;
        const { songId, rating } = data;

        const updatedSong = await Songs.findByIdAndUpdate({ _id: songId }, { rating: rating }, { new: true });
        console.log(updatedSong);

        return res.status(200).send({
            status: true,
            message: "song updated sucessfully"
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    AddNewSong,
    GetSongs,
    UpdateSong
}