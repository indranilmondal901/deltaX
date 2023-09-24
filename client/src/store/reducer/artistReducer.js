const {
    ARTIST_ADD_SUCCESS,
    ARTIST_ADD_FAIL,
    ARTIST_GET_SUCCESS,
    ARTIST_GET_FAIL,
    ARTIST_SUCESS_CLEAR,
    ARTIST_ERROR_CLEAR,
} = require("../types/artistTypes");

const initialState = {
    artistsData: [],
    errorMessage: null,
    successMessage: null,
    errorMessagee: null,
};

export const artistReducer = (state = initialState, action) => {
    const { payload, type } = action;

    if (type === ARTIST_ADD_SUCCESS) {
        return {
            ...state,
            errorMessage: null,
            successMessage: payload.successMessage,
        };
    }
    if (type === ARTIST_ADD_FAIL) {
        return {
            ...state,
            errorMessage: payload.errorMessage,
            successMessage: null,
        };
    }
    if (type === ARTIST_GET_SUCCESS) {
        return {
            ...state,
            artistsData: payload.data,
        };
    }
    if (type === ARTIST_GET_FAIL) {
        return {
            ...state,
            errorMessagee: payload.errorMessage,
        };
    }
    if (type === ARTIST_SUCESS_CLEAR) {
        return {
            ...state,
            successMessage: null,
        };
    }
    if (type === ARTIST_ERROR_CLEAR) {
        return {
            ...state,
            errorMessage: null,
        };
    }
    return state;
};