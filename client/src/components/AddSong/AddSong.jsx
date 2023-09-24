import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddArtist, GetAllArtist } from "../../store/action/artistAction";
import { ARTIST_SUCESS_CLEAR, ARTIST_ERROR_CLEAR } from "../../store/types/artistTypes";

import { AddNewSong , GetAllSongs} from "../../store/action/songAction";
import { SONG_SUCESS_CLEAR, SONG_ERROR_CLEAR } from "../../store/types/songTypes";

import Swal from "sweetalert2"

const AddSong = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { artistsData, successMessage, errorMessage } = useSelector((state) => state.artists)
    const { songsSuccessMessage, songsErrorMessage } = useSelector((state) => state.songs)

    let [allArtistData, setAllArtistData] = useState([]);

    useEffect(()=>{
        setAllArtistData(artistsData)
    },[artistsData])

    let [mockArtists, setMockArtists] = useState([]) /* state for drop down artist data */

    /* formatting for artistData for drop down */
    useEffect(() => {
        if (allArtistData.length > 0) {
            let newData = allArtistData.map((artist, index) => ({
                ...artist,
                id: index + 1
            }))
            setMockArtists(newData);
        }
    }, [allArtistData])


    const [data, setData] = useState({
        songName: '',
        releaseDate: '',
        artWork: '',
        selectedArtists: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleArtistSelection = (e) => {
        const selectedId = parseInt(e.target.value);
        console.log(selectedId)
        const selectedArtist = mockArtists.find(artist => artist.id === selectedId);

        console.log(44, selectedArtist)

        if (selectedArtist) {
            setData({
                ...data,
                selectedArtists: [...data.selectedArtists, selectedArtist],
            });
        }
    };

    const handleArtworkChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setData({
                ...data,
                artWork: file,
                selectedArtworkFile: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idArray = data.selectedArtists.map(artist => artist._id);

        console.log(data.artWork, idArray)


        const formData = new FormData();
        formData.append('songName', data.songName);
        formData.append('releaseDate', data.releaseDate);
        formData.append('artwork', data.artWork);

        const artistsJSON = JSON.stringify(idArray);
        formData.append('artists', artistsJSON);

        dispatch(AddNewSong(formData));
    };


    useEffect(() => {
        if (songsSuccessMessage) {
            Swal.fire({
                icon: 'success',
                title: 'Song is succesfully listed.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                dispatch({
                    type: SONG_SUCESS_CLEAR
                })
                //get call
                dispatch(GetAllSongs());
                //navigate
                navigate("/")
            })
        }
        if (songsErrorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!Unabel to add Song'
            }).then(() => {
                dispatch({
                    type: SONG_ERROR_CLEAR
                })
            })
        }
    }, [songsSuccessMessage, songsErrorMessage])





    /*************************************[modal section]**********************************/
    const [newArtistModalOpen, setNewArtistModalOpen] = useState(false);
    const [newArtistData, setNewArtistData] = useState({
        name: '',
        dob: '',
        bio: '',
    });

    const handleNewArtistInputChange = (e) => {
        const { name, value } = e.target;
        setNewArtistData({ ...newArtistData, [name]: value });
    };

    const handleAddNewArtist = () => {
        setNewArtistModalOpen(true);
    };

    //add new artist
    const handleSaveNewArtist = () => {
        console.log(newArtistData);
        dispatch(AddArtist(newArtistData));
    };

    const handleCancelNewArtist = () => {
        // Reset the new artist data
        setNewArtistData({
            name: '',
            dateOfBirth: '',
            bio: '',
        });

        // Close the modal
        setNewArtistModalOpen(false);
    };

    useEffect(() => {
        if (successMessage) {
            dispatch({
                type: ARTIST_SUCESS_CLEAR
            })
            dispatch(GetAllArtist());
            setNewArtistModalOpen(false);

        }
        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            }).then(() => {
                dispatch({
                    type: ARTIST_ERROR_CLEAR
                })
            })
        }
    }, [successMessage, errorMessage])

    /******************************************************/



    return (
        <div>
            <nav>
                <div className="left" onClick={() => { navigate("/") }}>Home</div>
                {/* <div className="right">
                    <input type="text" placeholder="Search" />
                </div> */}
            </nav>
            <div className="content">
                <h2>Add New Song</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="songName">Song Name:</label>
                        <input
                            type="text"
                            id="songName"
                            name="songName"
                            value={data.songName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="releaseDate">Date Released:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={data.releaseDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="artWork">ArtWork:</label>
                        <input
                            type="file"
                            id="artWork"
                            name="artWork"
                            onChange={handleArtworkChange}
                            accept="image/*"
                            required
                        />
                        {data.artWork && (
                            <div className="artwork-preview">
                                <h4>Artwork Preview:</h4>
                                <img src={data.selectedArtworkFile} alt="Artwork Preview" style={{ width: "200px", height: "200px" }} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label>Artists:</label>
                        <select onChange={handleArtistSelection}>
                            <option value="">Select an Artist</option>
                            {mockArtists.map(artist => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddNewArtist}>
                            Add New Artist
                        </button>
                    </div>
                    <div>
                        <label>Selected Artists:</label>
                        <ul>
                            {data.selectedArtists.map(artist => (
                                <li key={artist.id}>{artist.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>

            {/* Modal for adding a new artist */}
            {newArtistModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancelNewArtist}>
                            &times;
                        </span>
                        <h2>Add New Artist</h2>
                        <form>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newArtistData.name}
                                    onChange={handleNewArtistInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dob"
                                    value={newArtistData.dateOfBirth}
                                    onChange={handleNewArtistInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="bio">Bio:</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={newArtistData.bio}
                                    onChange={handleNewArtistInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button type="button" onClick={handleSaveNewArtist}>
                                    Save
                                </button>
                                <button type="button" onClick={handleCancelNewArtist}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSong;

