import axios from "axios";
const {
    SONG_ADD_SUCCESS,
    SONG_ADD_FAIL,
    SONG_GET_SUCCESS,
    SONG_GET_FAIL,
    SONG_UPDATE_SUCCESS,
    SONG_UPDATE_FAIL,
} = require("../types/songTypes");


const BASE_URL = "http://localhost:8080/api/v1/songs";

export const AddNewSong = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/addNewSong`, data);
            dispatch({
                type: SONG_ADD_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            let data = error.response.data.message;
            console.log(data)
            dispatch({
                type: SONG_ADD_FAIL,
                payload: {
                    errorMessage: data
                }
            })
        }
    }
}

export const GetAllSongs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/getSongs`);
            dispatch({
                type: SONG_GET_SUCCESS,
                payload: {
                    data: response.data.data,
                }
            })
        } catch (error) {
            console.log(error)
            if (error && error.Response) {
                let data = error.response.data.message;
                dispatch({
                    type: SONG_GET_FAIL,
                    payload: {
                        errorMessage: data
                    }
                })
            }
        }
    }
}

export const UpdateNewSong = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${BASE_URL}/updateSong`, data);

            dispatch({
                type: SONG_UPDATE_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            let data = error.response.data.message;
            // console.log(data)
            dispatch({
                type: SONG_UPDATE_FAIL,
                payload: {
                    errorMessage: data
                }
            })
        }
    }
}