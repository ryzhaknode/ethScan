import {Alchemy, Network} from "alchemy-sdk";

const settings = {
    apiKey: 'onoHh5jlscK4tHc0eKqRfiv1jm-Ja2PZ',
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);