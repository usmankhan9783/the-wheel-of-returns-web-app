
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { configEnv } from './configEnv';
import { web3Store } from '../store/web3Store';
import TheWheelOfReturns from './contract/TheWheelOfReturns.json';
import { getQueryVariable, tokenPriceAVAX } from './helper';
import { notification } from '../component/Notification';
import { setAvaxPrice, setContractData, setWalletAddress } from '../store/web3Slice';

export let web3 = new Web3(configEnv.AVAX_RPC);

export const connectWallet = async () => {
	try {
		const state = web3Store.getState();
		const address = state?.web3Reducer?.userAddress;
		if (!address) {
			console.log('Connecting to wallet');
			// /*
			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						bridge: 'https://bridge.walletconnect.org',
						chainId: configEnv.AVAX_CHAINID, //137 for mainnet
						// network: configEnv.AVAX_NETWORK_ID, //matic for mainnet
						rpc: {
							43113: configEnv.AVAX_RPC,
							// 43114: configEnv.AVAX_RPC,
						},
					},
				},
			};

			console.log('Provider is', providerOptions);

			const web3Modal = new Web3Modal({
				// network: configEnv.AVAX_NETWORK_ID,
				cacheProvider: false, // optional
				providerOptions, // required
				disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
			});

			console.log('Web3Modal instance is', web3Modal);
			const provider = await web3Modal.connect();

			provider.on('accountsChanged', async accounts => {
				console.log('Accounts', accounts);
				web3Store.dispatch(setWalletAddress(accounts[0]));
				// await getUserData();
				// await getUserDeposits();
			});

			web3 = new Web3(provider);

			console.log('Web3 instance is', web3);

			const chainid = await web3.eth.getChainId();

			console.log(chainid);
			if (chainid !== configEnv.AVAX_CHAINID) {
				notification('error',`Please connect to ${configEnv.AVAX_NETWORK_NAME}`);
				return;
			}
			const accounts = await web3.eth.getAccounts();
			console.log('Acount is', accounts[0]);

			web3Store.dispatch(setWalletAddress(accounts[0]));
			// await getUserData();
			// await getUserDeposits();
		} else {
			console.log('Already connected');
		}
	} catch (err) {
		console.log(err);
		notification('error',err.message);
	}
};

export const getContractInstance = async web3 => {
	const address = configEnv.CONTRACT_ADDRESS;
	return new Promise(resolve => {
		const contract = new web3.eth.Contract(TheWheelOfReturns['abi'], address);
		resolve(contract);
	});
};

export const getAvaxPrice = async () =>{
    try {
		const priceInUsd = await tokenPriceAVAX();
		await web3Store.dispatch(setAvaxPrice(priceInUsd));
	} catch (err) {
		console.log(err);
	}
}

export const getContractData = async ()=>{
    try {
		const theWheelOfReturns = await getContractInstance(web3);
		const contractData = await theWheelOfReturns.methods
			.getContractInformation()
			.call();

        const contractBalance = parseFloat(web3.utils.fromWei(contractData[0]));
        const totalInvested = parseFloat(web3.utils.fromWei(contractData[1]));
        const totalWithdrawal = parseFloat(web3.utils.fromWei(contractData[2]));
        const totalSpinCount = parseFloat(contractData[3]);
        const totalReferralReward = parseFloat(web3.utils.fromWei(contractData[4]));
        web3Store.dispatch(setContractData({
            contractBalance,
            totalInvested,
            totalWithdrawal,
            totalSpinCount,
            totalReferralReward,
        }));
	} catch (err) {
		console.log(err);
	}
}

export const getUserData = async (walletAddress) => {
	try{

	}
	catch(err){
		
	}
}