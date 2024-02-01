export type TransactionType = {
    asset: string,
    blockNum: string,
    category: string,
    erc721TokenId: any,
    erc1155Metadata: any,
    from: string,
    hash: string,
    rawContract: rawContractType
    to: string,
    tokenId: any,
    uniqueId: string
    value: number
}

type rawContractType = {
    address: any,
    decimal: string,
    value: string,
}