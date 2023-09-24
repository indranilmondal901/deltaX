import axios from "axios";

const {
    ARTIST_ADD_SUCCESS,
    ARTIST_ADD_FAIL,
    ARTIST_GET_SUCCESS,
    ARTIST_GET_FAIL,
} = require("../types/artistTypes");


const BASE_URL = "http://localhost:8080/api/v1/artists"

export const AddArtist = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/addArtist`, data);
            dispatch({
                type: ARTIST_ADD_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            let data = error.response.data.message
            // console.log(data)
            dispatch({
                type: ARTIST_ADD_FAIL,
                payload: {
                    errorMessage: data
                }
            })
        }
    }
}

export const GetAllArtist = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/getArtist`);
            dispatch({
                type: ARTIST_GET_SUCCESS,
                payload: {
                    data: response.data.data,
                }
            })
        } catch (error) {
            console.log(error)
            if (error && error.response) {
                let data = error.response.data.message
                // console.log(data)
                dispatch({
                    type: ARTIST_GET_FAIL,
                    payload: {
                        errorMessage: data
                    }
                })
            }
        }
    }
}