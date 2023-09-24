const Artist = require("../model/artistModel");

const AddArtist = async (req, res) => {
    try {
        const data = req.body;
        const { name, dob, bio } = data;

        if (!name || !dob || !bio) {
            return res.status(400).send({ status: false, message: "Please fill all the data." })
        }


        let newArtist = await Artist.create(data);
        console.log(newArtist);

        return res.status(200).send({
            status: true,
            message: "Artist add successfully"
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }

};
const GetArtist = async (req, res) => {
    try {
        const allArtists = await Artist.find();

        return res.status(200).send({
            status: true,
            data: allArtists
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

module.exports = {
    AddArtist,
    GetArtist
}