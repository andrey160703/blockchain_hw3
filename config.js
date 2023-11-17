import dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x05d8892EEec61C3A11B1dac3Fcab63ed4b928620';
const MY_PRIVATE_KEY = process.env.PRIVATE_KEY || '...';
const INFURA_API_LINK = process.env.INFURA_API || 'https://polygon-mumbai.infura.io/v3/a4a77bb841c6498cabf9197a4c2fab16';

export {
    CONTRACT_ADDRESS,
    MY_PRIVATE_KEY,
    INFURA_API_LINK,
}