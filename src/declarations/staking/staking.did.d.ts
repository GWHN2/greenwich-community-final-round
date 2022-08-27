import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError = { 'NotStaked' : null } |
  { 'ErrorServer' : null } |
  { 'NotApproveForStakingOrNotEnoughtToken' : null } |
  { 'AmountIsLessThanMinStake' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null } |
  { 'StakingPackageDoesNotExist' : null };
export type StakeResult = { 'Ok' : boolean } |
  { 'Err' : ApiError };
export interface Staking {
  'Stake' : ActorMethod<[Principal, bigint], StakeResult>,
  'getCanisterPrincipal' : ActorMethod<[], Principal>,
  'isStake' : ActorMethod<[Principal], boolean>,
}
export interface _SERVICE extends Staking {}
