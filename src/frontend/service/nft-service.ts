import { Principal } from "@dfinity/principal";
import { makeNftActor } from "./actor-locator";

export type   MintNFTProps = {
  url: string;
  name: string;
  description: string;
  owner: string;
};

export const mintNFT = async ({
  url,
  name,
  description,
  owner,
}: MintNFTProps) => {
  const actorService = await makeNftActor();
  const metadata = {
    name,
    description,
    url,
    owner: Principal.fromText(owner),
  };
  const result = await actorService.mint(metadata);
  return result;
};

export const getMyNfts = async () => {
  const actorService = await makeNftActor();
  const result = await actorService.getAllNfts();
  return result;
};

export const transferNFT = async (
  from: string,
  to: string,
  tokenId: number
) => {
  const actorService = await makeNftActor();
  const fromId = Principal.fromText(from);
  const toId = Principal.fromText(to);

  const result = await actorService.transfer(fromId, tokenId, toId);

  return result;
};
