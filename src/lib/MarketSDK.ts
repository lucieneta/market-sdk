import Web3 from "web3";
import { Addrs } from "..";
import MarketAdmin from "./MarketAdmin";

export interface MarketOptions {
  poolDirectory: string;
  poolLens: string;
  blocksPerMin: number;
};

class MarketSDK {
  readonly web3: Web3;
  options?: MarketOptions;

  constructor(web3: Web3, options?: MarketOptions){
    this.web3 = web3;
    this.options = options;
  }
  isMarketAdmin(address: string): Promise<boolean> {
    return new MarketAdmin(this, address).isMarketAdmin();
  }
  async init(){
    if(!this.options){
      const chainId = await this.web3.eth.getChainId() as keyof typeof Addrs;

      this.options = {
        // @ts-ignore
        poolDirectory: Addrs[chainId].v2.poolDirectory,
        // @ts-ignore
        poolLens: Addrs[chainId].v2.poolLens,
        blocksPerMin: Addrs[chainId].blocksPerMin
      };
    }
  }
  checkInit(){
    if(!this.options){
      throw new Error("SDK not initialized");
    }
  }
  static async init(web3: Web3, options?: MarketOptions){
    const sdk = new MarketSDK(web3, options);
    await sdk.init();

    return sdk;
  }
}

export default MarketSDK;
