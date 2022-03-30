import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from "./web3Slice.js";


export const web3Store = configureStore({
    reducer: {
        web3Reducer: web3Reducer
    },
})