
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { configEnv } from './configEnv';
import { web3Store } from '../store/web3Store';
import TheWheelOfReturns from './contract/TheWheelOfReturns.json';
import { getQueryVariable, tokenPriceAVAX } from './helper';
import { notification } from '../component/Notification';
import { setAvaxPrice, setContractData, setUserData, setWalletAddress,setLoaderValue, setUserDeposits, setPopupValue } from '../store/web3Slice';

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
				await getUserData();
				await getUserDeposits();
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
			await getUserData();
			await getUserDeposits();
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
		let state = web3Store.getState();
		if(!state?.web3Reducer?.avaxPrice){
			await getAvaxPrice();
			state = web3Store.getState();
		}
		
		const theWheelOfReturns = await getContractInstance(web3);
		const contractData = await theWheelOfReturns.methods
			.getContractInformation()
			.call();

		const contractBalance = parseFloat(web3.utils.fromWei(contractData[0]));
		const contractBalanceUsd = parseFloat(web3.utils.fromWei(contractData[0])) * state?.web3Reducer?.avaxPrice;
        const totalInvested = parseFloat(web3.utils.fromWei(contractData[1]));
		const totalInvestedUsd = parseFloat(web3.utils.fromWei(contractData[1])) * state?.web3Reducer?.avaxPrice;
        const totalWithdrawal = parseFloat(web3.utils.fromWei(contractData[2]));
		const totalWithdrawalUsd = parseFloat(web3.utils.fromWei(contractData[2])) * state?.web3Reducer?.avaxPrice;
        const totalSpinCount = parseFloat(contractData[3]);
        const totalReferralReward = parseFloat(web3.utils.fromWei(contractData[4]));
		const totalReferralRewardUsd = parseFloat(web3.utils.fromWei(contractData[4])) * state?.web3Reducer?.avaxPrice;
        web3Store.dispatch(setContractData({
            contractBalance,
			contractBalanceUsd,
            totalInvested,
			totalInvestedUsd,
            totalWithdrawal,
			totalWithdrawalUsd,
            totalSpinCount,
            totalReferralReward,
			totalReferralRewardUsd,
        }));
	} catch (err) {
		console.log(err);
	}
}

export const getUserData = async () => {
	try{
		let state = web3Store.getState();
		if(!state?.web3Reducer?.avaxPrice){
			await getAvaxPrice();
			state = web3Store.getState();
		}
		const walletAddress = state?.web3Reducer?.userAddress;
		const theWheelOfReturns = await getContractInstance(web3);
		const investorData = await theWheelOfReturns
			.methods
			.investors(walletAddress)
			.call();
		const dividend = await theWheelOfReturns
		.methods
		.getUserDividends(walletAddress)
		.call();
		const userData={
			investmentCount:parseFloat(investorData?.investmentCount),
			investmentTime:parseFloat(investorData?.investmentTime),
			lastWithdrawDate:parseFloat(investorData?.lastWithdrawDate),
			totalInvestment:parseFloat(web3.utils.fromWei(investorData?.totalInvestment,"ether")),
			totalInvestmentUsd:parseFloat(web3.utils.fromWei(investorData?.totalInvestment,"ether"))*state?.web3Reducer?.avaxPrice,
			totalRef:parseFloat(web3.utils.fromWei(investorData?.totalRef,"ether")),
			totalRefUsd:parseFloat(web3.utils.fromWei(investorData?.totalRef,"ether"))*state?.web3Reducer?.avaxPrice,
			totalWithdraw:parseFloat(web3.utils.fromWei(investorData?.totalWithdraw,"ether")),
			totalWithdrawUsd:parseFloat(web3.utils.fromWei(investorData?.totalWithdraw,"ether"))*state?.web3Reducer?.avaxPrice,
			dividend:parseFloat(web3.utils.fromWei(dividend,"ether")), 
			dividendUsd:parseFloat(web3.utils.fromWei(dividend,"ether"))*state?.web3Reducer?.avaxPrice, 
		}

		await web3Store.dispatch(setUserData(userData))
	}
	catch(err){
		console.log(err)
	}
}

export const investHandler = async (value)=>{
	try {
		const state = web3Store.getState();
		const userAddress = state?.web3Reducer?.userAddress;
		if (!userAddress) {
			notification('error','Please connect your wallet');
			return;
		}

		if(value<0.1){
			notification('error',"Cannot invest less than 0.1 AVAX");
			return;
		}
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: true,
				loaderMessage:
					'Please wait, we are processing your transaction',
			})
		);
		const theWheelOfReturns = await getContractInstance(web3);

		const valueInWei = web3.utils.toWei(value.toString(), 'ether');
		let ref = getQueryVariable('ref');
		if (!web3.utils.isAddress(ref)) {
			ref = configEnv['REF_ADDRESS'];
		}

		const trx = await theWheelOfReturns.methods.invest(ref).send({
			from: userAddress,
			value: valueInWei,
			maxPriorityFeePerGas: null,
			maxFeePerGas: null,
		});
		console.log(trx);
		getContractData();
		getUserData();
		const lastDeposit = await getLastDeposit()
		getUserDeposits();

		const popupMessage = `You have got ${lastDeposit?.percent}% daily return for ${lastDeposit?.maxDays} days`
		
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: false,
				loaderMessage: '',
			})
		);
		web3Store.dispatch(
			setPopupValue({
				isLoaderOpen: true,
				loaderMessage: popupMessage,
			})
		)
		notification('success','Investment successful');

		// alert('trx successful', trx.transactionHash);
	} catch (err) {
		console.log(err);
		// alert(err.message);
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: false,
				loaderMessage: '',
			})
		);
		notification('error',err.message);
	}
}

export const withdrawHandler = async () => {
	try {
		const state = web3Store.getState();
		const userAddress = state?.web3Reducer?.userAddress;
		if (!userAddress) {
			// alert('Please connect your wallet');
			notification('error','Please connect your wallet');
			return;
		}
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: true,
				loaderMessage:
					'Please wait, we are processing your transaction',
			})
		);
		const theWheelOfReturns = await getContractInstance(web3);

		const trx = await theWheelOfReturns.methods.withdraw().send({
			from: userAddress,
			maxPriorityFeePerGas: null,
			maxFeePerGas: null,
		});

		getContractData ();
		getUserData();
		// alert('trx successful', trx.transactionHash);
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: false,
				loaderMessage: '',
			})
		);
		notification('success','Withdraw successful');
	} catch (err) {
		console.log(err);
		// alert(err.message);
		web3Store.dispatch(
			setLoaderValue({
				isLoaderOpen: false,
				loaderMessage: '',
			})
		);
		notification('error',err.message);
	}
};

export const getUserDeposits = async () => {
	try {
		const state = web3Store.getState();
		const userAddress = state?.web3Reducer?.userAddress;
		if (!userAddress) {
			// alert('Please connect your wallet');
			return;
		}
		const theWheelOfReturns = await getContractInstance(web3);
		const totalUserDeposits = await theWheelOfReturns.methods
			.getUserAmountOfSpins(userAddress)
			.call();
		let userDepositPlans = [];
		for (let i = 0; i < parseInt(totalUserDeposits); i++) {
			console.log(`${i+1} done`)
			const usersDeposit = await theWheelOfReturns.methods
				.getUserSpinInfo(userAddress, i)
				.call();
			const userDepositsObject = {
				maxDays: parseInt(usersDeposit?.maxDays),
				percent: parseInt(usersDeposit?.percent) / 10,
				amount: parseFloat(
					web3.utils.fromWei(usersDeposit?.amount, 'ether')
				),
				totalReturn   : parseFloat(
					web3.utils.fromWei(usersDeposit?.totalReturn, 'ether')
				),
				start: usersDeposit?.start * 1000,
				finish: usersDeposit?.finish * 1000,
			};
			userDepositPlans.push(userDepositsObject);
		}
		userDepositPlans = JSON.parse(JSON.stringify(userDepositPlans));
		await web3Store.dispatch(setUserDeposits(userDepositPlans));
	} catch (err) {
		console.log(err);
	}
};

export const getLastDeposit = async()=>{
	try{
		const state = web3Store.getState();
		const userAddress = state?.web3Reducer?.userAddress;
		if (!userAddress) {
			// alert('Please connect your wallet');
			return;
		}
		const theWheelOfReturns = await getContractInstance(web3);
		const totalUserDeposits = await theWheelOfReturns.methods
			.getUserAmountOfSpins(userAddress)
			.call();
			
		const usersDeposit = await theWheelOfReturns.methods
			.getUserSpinInfo(userAddress, parseFloat(totalUserDeposits)-1)
			.call();
		const userDepositsObject = {
			maxDays: parseInt(usersDeposit?.maxDays),
			percent: parseInt(usersDeposit?.percent) / 10,
			amount: parseFloat(
				web3.utils.fromWei(usersDeposit?.amount, 'ether')
			),
			totalReturn   : parseFloat(
				web3.utils.fromWei(usersDeposit?.totalReturn, 'ether')
			),
			start: usersDeposit?.start * 1000,
			finish: usersDeposit?.finish * 1000,
		};
		console.log('Last user deposit',userDepositsObject)
		return userDepositsObject;
	}
	catch(err){
		console.log(err);
	}
}