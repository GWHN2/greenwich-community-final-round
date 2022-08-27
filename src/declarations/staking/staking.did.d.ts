import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError = { 'NotStaked' : null } |
  { 'ErrorServer' : null } |
  { 'NotApproveForStakingOrNotEnoughtToken' : null } |
  { 'AmountIsLessThanMinStake' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null } |
  { 'StakingPackageDoesNotExist' : null };
export type DeleteStakingPackage = { 'Ok' : boolean } |
  { 'Err' : ApiError };
export type StakeResult = { 'Ok' : boolean } |
  { 'Err' : ApiError };
export interface Staking {
  'AddPackage' : ActorMethod<[StakingPackageCreate], bigint>,
  'DeleteStakingPackage' : ActorMethod<[bigint], DeleteStakingPackage>,
  'GetMyStaking' : ActorMethod<[Principal], Array<StakingInfo>>,
  'GetStakingPackage' : ActorMethod<[], Array<StakingPackage>>,
  'Stake' : ActorMethod<[Principal, bigint, bigint], StakeResult>,
  'Unstake' : ActorMethod<[Principal, bigint], UnStakeResult>,
  'getCanisterPrincipal' : ActorMethod<[], Principal>,
  'isStake' : ActorMethod<[Principal], boolean>,
}
export interface StakingInfo {
  'startTime' : Time,
  'owner' : Principal,
  'timePoint' : Time,
  'totalProfit' : bigint,
  'amount' : bigint,
}
export interface StakingPackage {
  'id' : bigint,
  'fee' : number,
  'lockTime' : Time,
  'isOff' : boolean,
  'minStaking' : bigint,
}
export interface StakingPackageCreate {
  'fee' : number,
  'lockTime' : Time,
  'minStaking' : bigint,
}
export type Time = bigint;
export type UnStakeResult = { 'Ok' : boolean } |
  { 'Err' : ApiError };
export interface _SERVICE extends Staking {}
