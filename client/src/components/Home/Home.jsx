import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddArtist, GetAllArtist } from "../../store/action/artistAction";
import { ARTIST_SUCESS_CLEAR, ARTIST_ERROR_CLEAR } from "../../store/types/artistTypes";

import { UpdateNewSong, GetAllSongs } from "../../store/action/songAction";
import { SONG_SUCESS_CLEAR, SONG_ERROR_CLEAR } from "../../store/types/songTypes";

import Swal from 'sweetalert2';

import { Blocks } from 'react-loader-spinner'

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

   

    const [loader, setLoader] = useState(true);
    const { artistsData, successMessage, errorMessage } = useSelector((state) => state.artists)
    const { songsData, songsSuccessMessage, songsErrorMessage } = useSelector((state) => state.songs)


    const [topSongs, setTopSongs] = useState([]);
    const [ topArtists, setTopArtist] = useState([]);

    useEffect(()=>{
        if( songsData && songsData.length === 0){
        dispatch(GetAllSongs());
        }
        if(artistsData && artistsData.length === 0){
            dispatch(GetAllArtist());
        }
    },[])

    useEffect(() => {
        if (songsData.length > 0) {

            let newSortedSongs =  songsData.sort((a, b) => b.rating - a.rating);

            let allTopSongs = newSortedSongs.slice(0, 10).map(song => {
                const artists = song.artists.map(artist => artist.name).join(', ');
                return {
                    id: song._id,
                    artWork: song.artWork,
                    songName: song.songName,
                    releaseDate: song.releaseDate,
                    artists,
                    rating: song.rating,
                };
            });

            setTopSongs(allTopSongs);

        }
    }, [songsData])

    useEffect(() => {
        if (artistsData.length > 0 && songsData.length>0) {

            let allTopArtists = artistsData.slice(0, 10).map(artist => {
                const artistSongs = songsData.filter(song => song.artists.some(a => a._id === artist._id));
                const songs = artistSongs.map(song => song.songName).join(', ');
                return {
                    id: artist._id,
                    artistName: artist.name,
                    dateOfBirth: artist.dob,
                    songs,
                };
            });

            setTopArtist(allTopArtists);
        }
    }, [artistsData])

    useEffect(() => {
        if(topSongs && topSongs.length > 0){
            let newSortedSongs =  topSongs.sort((a, b) => b.rating - a.rating);
            setTopSongs(newSortedSongs);
        }
    },[topSongs]);

    useEffect(()=>{
        if(topSongs && topSongs.length && topArtists && topArtists.length > 0){
            setLoader(false);
        }
    },[topSongs && topArtists])


    const StarRating = ({ rating, onClick }) => {
        const stars = [1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={star <= rating ? 'star-filled' : 'star'}
                onClick={() => onClick(star)}
            >
                ★
            </span>
        ));

        return <div>{stars}</div>;
    };

    const handleRatingChange = (songId, newRating) => {
        setTopSongs((prevSongs) =>
            prevSongs.map((song) =>
                song.id === songId ? { ...song, rating: newRating } : song
            )
        );
        console.log(songId, newRating);
        dispatch(UpdateNewSong({ songId: songId, rating: newRating }))
    };

    useEffect(() => {
        if (songsSuccessMessage) {

            dispatch({
                type: SONG_SUCESS_CLEAR
            })
            
        }
        if (songsErrorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your rating is not accepted due to some network issues'
            }).then(() => {
                dispatch({
                    type: SONG_ERROR_CLEAR
                })
            })
        }
    }, [songsSuccessMessage, songsErrorMessage])

    /*----------------------------------[search functionality]---------------------------------------- */
    const [searchQuery, setSearchQuery] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSongs = topSongs.filter(song => {
        return (
            song.songName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artists.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    /*------------------------------------------------------------------------------------------------ */

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <>
            {loader ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </div>
            ) : (
                <div>
                    <nav>
                        <div className="left" onClick={() => { navigate("/") }}>Home</div>
                        {/* <div className="left" onClick={()=>{navigate("/addSongs")}}>Add New Songs</div> */}
                        <div className="right">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </nav>
                    {searchQuery && searchQuery.length > 0 ? (
                        <><table>
                            <thead>
                                <tr>
                                    <th>ArtWork</th>
                                    <th>Song</th>
                                    <th>Date Of Release</th>
                                    <th>Artists</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSongs && filteredSongs.length > 0 ? filteredSongs.map((song) => (
                                    <tr key={song.id}>
                                        <td>
                                            <img src={song.artWork} alt={song.songName} />
                                        </td>
                                        <td>{song.songName}</td>
                                        <td>{formatDate(song.releaseDate)}</td>
                                        <td>{song.artists}</td>
                                        <td>
                                            <StarRating
                                                rating={song.rating}
                                                onClick={(newRating) =>
                                                    handleRatingChange(song.id, newRating)
                                                }
                                            />
                                        </td>
                                    </tr>
                                )) : <p>Sorry, No Match Found</p>}
                            </tbody>
                        </table>
                        </>
                    ) : (
                        <>
                            <div className="content">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h2>Top 10 Songs</h2>
                                    <button className="navigateBtn" onClick={() => { navigate("/addSong") }}>Add New Songs</button>
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>ArtWork</th>
                                            <th>Song</th>
                                            <th>Date Of Release</th>
                                            <th>Artists</th>
                                            <th>Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topSongs && topSongs.length > 0 && topSongs.map((song) => (
                                            <tr key={song.id}>
                                                <td>
                                                    <img src={song.artWork} alt={song.songName} />
                                                </td>
                                                <td>{song.songName}</td>
                                                <td>{formatDate(song.releaseDate)}</td>
                                                <td>{song.artists}</td>
                                                <td>
                                                    <StarRating
                                                        rating={song.rating}
                                                        onClick={(newRating) =>
                                                            handleRatingChange(song.id, newRating)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h2>Top 10 Artists</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Artist</th>
                                            <th>Date of Birth</th>
                                            <th>Songs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topArtists && topArtists.length > 0 && topArtists.map((artist,index) => (
                                            <tr key={index}>
                                                <td>{artist.artistName}</td>
                                                <td>{formatDate(artist.dateOfBirth)}</td>
                                                <td>{artist.songs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    }


                </div>
            )}
        </>

    );
};

export default Home;
