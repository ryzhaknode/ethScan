import {alchemy} from "../../../alchemy";

export const getLastTransfer = async (adress: string) => {
    try {
        const getTransfers = alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            toBlock: "latest",
            contractAddresses: [adress],
            excludeZeroValue: true,
            // @ts-ignore
            category: ["internal"],
        });
        const firstPage = await getTransfers;
        const firstPageLength = firstPage.transfers.length;
        if (firstPageLength > 0) {
            const lastTransaction = firstPage.transfers[firstPageLength - 1];
            const {hash} = lastTransaction;

            console.log(hash)
            if (hash) {
                return hash;
            } else {
                return null
            }
        } else {
            console.log("No transfers found on the first page.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching transfers:", error?.message);
        return null;
    }
};

