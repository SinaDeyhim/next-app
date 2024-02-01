// Setup: npm install alchemy-sdk

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "sLBKRBkrISN2du2D6omTTS-FK6Xtn25s",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export const getTxs = async (address: string) => {
    // @ts-ignore
    return await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
        maxCount: 60
      });
}

