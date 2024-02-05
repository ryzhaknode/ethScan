import Web3 from "web3";

const infuraUrl = 'https://mainnet.infura.io/v3/334a260c8bae4aa58f4d351fb39da106'


const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));


export const tokenAdress = {
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
}

const usdtAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
            "indexed": true,
            "name": "to",
            "type": "address"
        }, {"indexed": false, "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }
];

const usdtContract = new web3.eth.Contract(usdtAbi, tokenAdress.usdt);

const usdtTransferFilter = {
    address: tokenAdress.usdt,
    topics: [
        web3.utils.sha3('Transfer(address,address,uint256)'),
        null, // Sender
        null, // Receiver
    ],
};

export async function checkForNewTransfers(tokenAddress:string, limitValue = 100000) {
    let transferInfo: any;
    try {
        const logs = await web3.eth.getPastLogs({
            fromBlock: 'latest',
            toBlock: 'latest',
            address: tokenAddress.toLowerCase(),
            // @ts-ignore
            topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
        });


        logs.forEach(log => {
            // Check if the log matches the transfer event for USDT
            if (
                // @ts-ignore
                log.topics[0] === web3.utils.sha3('Transfer(address,address,uint256)') &&
                // @ts-ignore
                log.address.toLowerCase() === tokenAddress.toLowerCase()
            ) {

                // @ts-ignore
                const sender = '0x' + log.topics[1].slice(26); // Extract sender address
                // @ts-ignore
                const recipient = '0x' + log.topics[2].slice(26); // Extract recipient address
                // @ts-ignore
                const amountHex = log.data; // Hexadecimal representation of the amount
                const amountDecimal = parseInt(amountHex, 16);

                const usdtAmount = amountDecimal / 1e6;

                // @ts-ignore
                const transactionHash = log.transactionHash;

                // Check if the transfer amount is greater than 1000
                if (usdtAmount > limitValue) {
                    // Record the relevant information
                    transferInfo = {
                        sender,
                        recipient,
                        amount: usdtAmount.toFixed(2),
                        transactionHash,
                    };
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }

    if(transferInfo) return transferInfo

}