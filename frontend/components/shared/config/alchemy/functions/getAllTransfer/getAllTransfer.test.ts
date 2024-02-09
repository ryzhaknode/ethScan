import {getAllTransfer} from "./getAllTransfer";
import {AssetTransfersWithMetadataResult} from "alchemy-sdk";

describe("getAllTransfer", () => {
    test("with correct string on wallet", async () => {
        const address = "0x20769D03E13365d0638c826e36D9cd3f13Cb889A";
        const transfers = await getAllTransfer(address);

        if (transfers) {
            transfers.forEach((item: AssetTransfersWithMetadataResult) => {
                expect(item).toEqual(expect.any(Object));
                expect(item).toHaveProperty('blockNum', expect.any(String));
                expect(item).toHaveProperty('category', expect.any(String));
                expect(item).toHaveProperty('from', expect.any(String));
                expect(item).toHaveProperty('hash', expect.any(String));
                expect(item).toHaveProperty('to', expect.any(String));

                if (item.asset !== null) {
                    expect(item.asset).toEqual(expect.any(String));
                } else {
                    expect(item.asset).toBeNull();
                }

            });
        } else {
            expect(transfers).toBeNull();
        }
    });

    test("with incorrect string on wallet", async () => {
        const address = "";
        const transfers = await getAllTransfer(address);

        expect(transfers).toBeNull()
    });

});