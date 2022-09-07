import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";

import RewardsDistrbutorArtifact from "../abi/RewardsDistributor.json";
import { RewardsDistributor as RewardsDistributorWeb3Interface } from "../types/RewardsDistributor";

import { NonPayableTx } from "../types/types";

import MarketSDK from "./MarketSDK";
import { CToken, CTokenV2 } from "./CToken";

class RewardsDistributor extends MarketContract<RewardsDistributorWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, RewardsDistrbutorArtifact.abi);
  }

  _accetpAdmin(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._acceptAdmin().send(tx);
  }

  _grantComp(
    recipient: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._grantComp(recipient, amount).send(tx);
  }

  _setCompBorrowSpeed(
    cToken: CToken | CTokenV2 | string,
    compSpeed: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = typeof cToken === "string" ? cToken : cToken.address;
    return this.contract.methods._setCompBorrowSpeed(cToken, compSpeed).send(tx);
  }

  _setCompSpeeds(
    cTokens: (CToken | CTokenV2 | string)[],
    supplySpeeds: (number | string | BN)[],
    borrowSpeeds: (number | string | BN)[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokens = cTokens.map(cToken => typeof cToken === "string" ? cToken : cToken.address);
    return this.contract.methods._setCompSpeeds(<string[]>cTokens, supplySpeeds, borrowSpeeds).send(tx);
  }

  _setCompSupplySpeed(
    cToken: CToken | CTokenV2 | string,
    compSpeed: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = typeof cToken === "string" ? cToken : cToken.address;
    return this.contract.methods._setCompSupplySpeed(cToken, compSpeed).send(tx);
  }

  _setContributorCompSpeed(
    contributor: string,
    compSpeed: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setContributorCompSpeed(contributor, compSpeed).send(tx);
  }

  _setPendingAdmin(
    newPendingAdmin: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setPendingAdmin(newPendingAdmin).send(tx);
  }

  admin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.admin().call();
  }

  async allMarkets(
    index: number | string | BN,
    tx?: NonPayableTx
  ): Promise<CTokenV2> {
    return new CTokenV2(this.sdk, await this.contract.methods.allMarkets(index).call(tx));
  }

  "claimRewards(address,address[])"(
    holder: string,
    cTokens: (CToken | CTokenV2 | string)[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokens = cTokens.map(cToken => typeof cToken === "string" ? cToken : cToken.address);
    return this.contract.methods["claimRewards(address,address[])"](holder, <string[]>cTokens).send(tx);
  }

  "claimRewards(address)"(
    holder: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods["claimRewards(address)"](holder).send(tx);
  }

  "claimRewards(address[],address[],bool,bool)"(
    holders: string[],
    cTokens: (CToken | CTokenV2 | string)[],
    borrowers: boolean,
    suppliers: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokens = cTokens.map(cToken => typeof cToken === "string" ? cToken : cToken.address);
    return this.contract.methods["claimRewards(address[],address[],bool,bool)"](holders, <string[]>cTokens, borrowers, suppliers).send(tx);
  }

  compAccrued(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compAccrued(arg0).call(tx)
  }

  compBorrowSpeeds(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compBorrowSpeeds(arg0).call(tx)
  }

  compBorrowState(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<{ index: string, block: string }> {
    return this.contract.methods.compBorrowState(arg0).call(tx)
  }

  compBorrowIndex(
    arg0: string,
    arg1: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compBorrowerIndex(arg0, arg1).call(tx);
  }

  compContirbutorSpeeds(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compContributorSpeeds(arg0).call(tx);
  }

  compInitialIndex(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compInitialIndex().call(tx);
  }

  compSupplySpeeds(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.compSupplySpeeds(arg0).call(tx);
  }

  compSupplyState(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<{ index: string, block: string }> {
    return this.contract.methods.compSupplyState(arg0).call(tx);
  }

  flywheelPreBorrowerAction(
    cToken: CToken | CTokenV2 | string,
    borrower: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = typeof cToken === "string" ? cToken : cToken.address;
    return this.contract.methods.flywheelPreBorrowerAction(cToken, borrower).send(tx);
  }

  flywheelPreSupplierAction(
    cToken: CToken | CTokenV2 | string,
    supplier: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = typeof cToken === "string" ? cToken : cToken.address;
    return this.contract.methods.flywheelPreSupplierAction(cToken, supplier).send(tx);
  }

  flywheelPreTransferAction(
    cToken: CToken | CTokenV2 | string,
    src: string,
    dist: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = typeof cToken === "string" ? cToken : cToken.address;
    return this.contract.methods.flywheelPreTransferAction(cToken, src, dist).send(tx);
  }

  async getAllMarkets(
    tx?: NonPayableTx
  ): Promise<CTokenV2[]> {
    const cTokenAddrs = await this.contract.methods.getAllMarkets().call(tx);
    return cTokenAddrs.map(addr => new CTokenV2(this.sdk, addr));
  }

  getBlockNumber(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.getBlockNumber().call(tx);
  }

  implementation(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.implementation().call(tx);
  }

  initialize(
    _rewardToken: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.initialize(_rewardToken).send(tx);
  }

  isRewardsDistributor(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isRewardsDistributor().call(tx);
  }

  lastContributorBlock(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.lastContributorBlock(arg0).call(tx);
  }

  pendingAdmin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.pendingAdmin().call(tx);
  }

  rewardToken(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.rewardToken().call(tx);
  }

  updateContriibutorRewards(
    contributor: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.updateContributorRewards(contributor).send(tx);
  }
}