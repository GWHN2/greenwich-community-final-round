import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ListId = bigint;
export interface Marketplace {
  'buyNFT' : ActorMethod<
    [Principal, Principal, bigint, bigint, ListId],
    boolean,
  >,
  'getAllLists' : ActorMethod<[], Array<[ListId, listNft]>>,
  'listNft' : ActorMethod<[bigint, bigint, dip721Metadata], boolean>,
}
export interface dip721Metadata {
  'url' : string,
  'owner' : Principal,
  'name' : string,
  'description' : string,
}
export interface listNft {
  'url' : string,
  'status' : string,
  'tokenId' : bigint,
  'name' : string,
  'description' : string,
  'seller' : Principal,
  'price' : bigint,
  'listId' : bigint,
}
export interface _SERVICE extends Marketplace {}
