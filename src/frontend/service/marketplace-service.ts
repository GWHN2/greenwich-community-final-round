import { Principal } from "@dfinity/principal";
import { NFTData } from "../data/type";
import { makeMarketplaceActor } from "./actor-locator";

export const listNft = async (value: number, nft: NFTData) => {
  const actorService = await makeMarketplaceActor();
  const metadata = {
    name: nft.name,
    description: nft.description,
    url: nft.url,
    owner: nft.owner,
  };

  const listingResult = await actorService.listNft(value, nft.id, metadata);

  return listingResult;
};

export const getAllLists = async () => {
  const actorService = await makeMarketplaceActor();
  const allLists = await actorService.getAllLists();
  return allLists;
};

export const buyNFT = async (
  seller: string,
  buyer: string,
  value: number,
  tokenId: number,
  listId: number
) => {
  const actorService = await makeMarketplaceActor();

  const sellerListId = Principal.fromText(seller);
  const buyerListId = Principal.fromText(buyer);

  const buyResult = await actorService.buyNFT(
    sellerListId,
    buyerListId,
    value,
    tokenId,
    listId
  );

  return buyResult;
};
