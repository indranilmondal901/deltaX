import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { songReducer } from './reducer/songReducer';
import { artistReducer } from './reducer/artistReducer';


const rootReducer = combineReducers({
    songs: songReducer,
    artists: artistReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;