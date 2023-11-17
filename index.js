import Web3 from 'web3';
import { CONTRACT_ADDRESS, MY_PRIVATE_KEY, INFURA_API_LINK } from './config.js';
import contractABI from './abi.json' assert { type: 'json' };

const web3Instance = new Web3(INFURA_API_LINK);
const mySmartContract = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDRESS);
const ethAccount = web3Instance.eth.accounts.privateKeyToAccount(MY_PRIVATE_KEY);

async function setCustomData(key, integerValue, stringValue, bytes32Value, booleanValue) {
    const convertedBytes32Value = web3Instance.utils.fromAscii(bytes32Value);

    const transactionObject = mySmartContract.methods.setCustomDataByKey(key, integerValue, stringValue, convertedBytes32Value, booleanValue);

    const nonce = await web3Instance.eth.getTransactionCount(ethAccount.address);

    const gasPrice = await web3Instance.eth.getGasPrice();
    const gasLimit = 300000;
    const transactionData = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: CONTRACT_ADDRESS,
        data: transactionObject.encodeABI(),
    };

    const signedTransaction = await web3Instance.eth.accounts.signTransaction(transactionData, MY_PRIVATE_KEY);

    const transactionReceipt = await web3Instance.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    return transactionReceipt;
}

async function getCustomData(key) {
    const result = await mySmartContract.methods.getCustomDataByKey(key).call();

    const customData = {
        integerValue: result.integerValue,
        stringValue: web3Instance.utils.hexToUtf8(result.stringValue),
        bytes32Value: web3Instance.utils.hexToUtf8(result.bytes32Value),
        booleanValue: result.booleanValue,
    };

    return customData;
}

const exampleKey = 'exampleKey';
const exampleIntegerValue = 42;
const exampleStringValue = 'Hello, World!';
const exampleBytes32Value = 'exampleBytes32Value';
const exampleBooleanValue = true;

try {
    const transactionReceipt = await setCustomData(
        exampleKey,
        exampleIntegerValue,
        exampleStringValue,
        exampleBytes32Value,
        exampleBooleanValue
    );
    console.log('Transaction Receipt:', transactionReceipt);
} catch (error) {
    console.error('Error sending transaction:', error);
}

try {
    const customData = await getCustomData(exampleKey);
    console.log('Custom Data:', customData);
} catch (error) {
    console.error('Error reading data from contract:', error);
}