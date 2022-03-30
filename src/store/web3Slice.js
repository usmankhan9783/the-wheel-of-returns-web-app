import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userAddress: '',
    contractData:'',
    userData:'',
    avaxPrice:0,
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
        setContractData(state,action){
            state.contractData = action.payload;
        },
        setUserData(state,action){
            state.userData = action.payload;
        },
        setAvaxPrice(state,action){
            state.avaxPrice = action.payload;
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
    setContractData,
    setUserData,
	setLoaderValue,
    setAvaxPrice,
} = web3Slice.actions;
export default web3Slice.reducer;