import {
  createActor as createTokenActor,
  canisterId as tokenCanisterId,
} from "../../declarations/token";
import {
  createActor as createNftActor,
  canisterId as nftCanisterId,
} from "../../declarations/nft";
import {
  createActor as createMarketplaceActor,
  canisterId as marketplaceCanisterId,
} from "../../declarations/marketplace";
import {
  createActor as createStakingActor,
  canisterId as stakingCanisterId,
} from "../../declarations/staking";

export const host = process.env.NEXT_PUBLIC_IC_HOST;
export const canisterId = {
  token: tokenCanisterId,
  nft: nftCanisterId,
  marketplace: marketplaceCanisterId,
  staking: stakingCanisterId,
};

export const makeActor = (canisterId: any, createActor: any) => {
  return createActor(canisterId, {
    agentOptions: {
      host: host,
    },
  });
};

export function makeTokenActor() {
  return makeActor(tokenCanisterId, createTokenActor);
}
export function makeNftActor() {
  return makeActor(nftCanisterId, createNftActor);
}

export function makeMarketplaceActor() {
  return makeActor(marketplaceCanisterId, createMarketplaceActor);
}
export function makeStakingActor() {
  return makeActor(stakingCanisterId, createStakingActor);
}
