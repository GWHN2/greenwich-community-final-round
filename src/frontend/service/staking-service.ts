import { Principal } from "@dfinity/principal";
import { makeStakingActor } from "./actor-locator";

export const stake = async (caller: string, amount: number) => {
  const actorService = await makeStakingActor();
  const PrincipalId = Principal.fromText(caller);

  const stakeResult = await actorService.Stake(PrincipalId, amount);

  return stakeResult;
};

export const isStake = async (address: string) => {
  const actorService = await makeStakingActor();
  const PrincipalId = Principal.fromText(address);

  const isStakeResult = await actorService.isStake(PrincipalId);

  return isStakeResult;
};
