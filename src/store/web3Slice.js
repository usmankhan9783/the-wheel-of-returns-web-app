import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userAddress: '',
	isLoaderOpen:false,
	loaderMessage:"",
};

const web3Slice = createSlice({
	name: 'web3Slice',
	initialState,
	reducers: {
		setWalletAddress(state, action) {
			state.userAddress = action.payload;
		},
		setLoaderValue(state,action){
			const {isLoaderOpen,loaderMessage} = action.payload;
			state.isLoaderOpen = isLoaderOpen;
			state.loaderMessage = loaderMessage;
		}
	},
});

export const {
	setWalletAddress,
	setLoaderValue,
} = web3Slice.actions;
export default web3Slice.reducer;