const {
    SONG_ADD_SUCCESS,
    SONG_ADD_FAIL,
    SONG_GET_SUCCESS,
    SONG_GET_FAIL,
    SONG_UPDATE_SUCCESS,
    SONG_UPDATE_FAIL,
    SONG_SUCESS_CLEAR,
    SONG_ERROR_CLEAR
} = require("../types/songTypes");

const initialState = {
    songsData: [],
    songsErrorMessage: null,
    songsSuccessMessage: null,
    songsErrorMessagee: null,
};

export const songReducer = (state = initialState, action) => {
    const { type, payload } = action;

    if (type === SONG_ADD_SUCCESS) {
        return {
            ...state,
            songsSuccessMessage: payload.successMessage
        }
    }
    if (type === SONG_ADD_FAIL) {
        return {
            ...state,
            songsErrorMessage: payload.errorMessage
        }
    }
    if (type === SONG_GET_SUCCESS) {
        console.log(" 35 action song")
        return {
            ...state,
            songsData: payload.data
        }
    }
    if (type === SONG_GET_FAIL) {
        return {
            ...state,
            songsErrorMessagee: payload.errorMessage
        }
    }
    if (type === SONG_UPDATE_SUCCESS) {
        return {
            ...state,
            songsSuccessMessage: payload.successMessage
        }
    }
    if (type === SONG_UPDATE_FAIL) {
        return {
            ...state,
            songsErrorMessage: payload.errorMessage
        }
    }

    if (type === SONG_SUCESS_CLEAR) {
        return {
            ...state,
            songsSuccessMessage: null
        }
    }
    if (type === SONG_ERROR_CLEAR) {
        return {
            ...state,
            songsErrorMessage: null
        }
    }
    return state;
};