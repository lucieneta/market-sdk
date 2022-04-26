import BN from "bn.js";

import MarketSDK from "./MarketSDK";
import MarketContract from "./MarketContract";

import { MarketLens as MarketLensWeb3Interface } from "../types/MarketLens";
import MarketLensArtifact from "../abi/PoolLens.json";

import { ComptrollerV2 } from "./Comptroller";
import { normalizePoolAsset, normalizePoolUser, PoolAsset, PoolUser } from "./Pool";
import { NonPayableTx } from "../types/types";

class MarketLens extends MarketContract<MarketLensWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, MarketLensArtifact.abi);
  }

  async getPoolAssetsWithData(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<PoolAsset[]> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;

    const assetsRaw = await this.contract.methods.getPoolAssetsWithData(comptroller).call(tx);
    const assets: PoolAsset[] = [];

    for(const asset of assetsRaw){
      assets.push(normalizePoolAsset(asset, this.sdk));
    }
    return assets;
  }

  
  async getPoolSummary(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolSummary(comptroller).call(tx);

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolUserSummary(
    comptroller: ComptrollerV2 | string,
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    suppluBalance: BN,
    borrowBalance: BN
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUserSummary(comptroller, account).call(tx);

    return {
      suppluBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
    };
  }

  async getPoolUsersWithData(
    comptroller: ComptrollerV2 | string,
    maxHealth: number | string | BN,
    tx?: NonPayableTx
  ): Promise<[
    PoolUser[],
    BN,
    BN
  ]> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUsersWithData(comptroller, maxHealth).call(tx);

    const users: PoolUser[] = [];
    for(const user of raw[0]){
      users.push(normalizePoolUser(user, this.sdk));
    }

    return [
      users,
      new BN(raw[1]),
      new BN(raw[2]),
    ];
  }
}


export { MarketLens };
