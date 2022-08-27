import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int  "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Types "types";

shared(msg) actor class Marketplace(nft : Principal, token : Principal)= Self {
    public type Time = Time.Time;
    private stable var listIdCount: Nat = 0;
    private type TokenId = Nat;
    private type ListId = Nat;
    private stable var listStore: [(Nat, Types.listNft)] = [];
    private var idToList: HashMap.HashMap<Nat, Types.listNft> = HashMap.fromIter(listStore.vals(), 10, Nat.equal, Hash.hash);
    private var owner = msg.caller;
    private var uogTokenProvider: Types.IDIP20 = actor(Principal.toText(nft)) : Types.IDIP20;
    private var nftProvider: Types.IDIP721 = actor(Principal.toText(token)) : Types.IDIP721;
    private stable var fee = 1;
    //1 function to list
    //1 function to 
    public shared(msg) func buyNFT(seller : Principal, buyer : Principal, value : Nat, tokenid : Nat, listId : ListId): async (Bool){
        let tokenProvider: Types.IDIP20 = actor(Principal.toText(nft)) : Types.IDIP20;
        let nftTokenProvider : Types.IDIP721 = actor(Principal.toText(token)) : Types.IDIP721;
        let ownerNft = await nftProvider.ownerOf(tokenid);
        let resultNft = await nftProvider.transfer(seller, tokenid, buyer);
        let resultToken = await tokenProvider.transfer(buyer, seller, value);
        let oldList = _unwrap(idToList.get(listId));
        let newList : Types.listNft = {
            listId = listId;
            tokenId = oldList.tokenId;
            price = oldList.price;
            seller = buyer;
            name = oldList.name;
            description = oldList.description;
            url = oldList.url;
            status = "Sold";
        };
        idToList.put(listId, newList);
        return true;
    };
    public shared(msg) func listNft(value: Nat, nftId:Nat, metadata: Types.dip721Metadata) : async (Bool){
        let ownerNft = await nftProvider.ownerOf(nftId);
        let listNftOfSeller = await nftProvider.getAllNfts();
        listIdCount += 1;
        let listIdInFunction = listIdCount;
        let new_item : Types.listNft = {
            listId = listIdInFunction;
            tokenId = nftId;
            price = value;
            seller = metadata.owner;
            name = metadata.name;
            description = metadata.name;   
            url = metadata.url;
            status = "In stock";
        };
        idToList.put(listIdCount, new_item);
        return true;
    };
    public query func getAllLists(): async[(ListId, Types.listNft)]{
        return Iter.toArray<(ListId, Types.listNft)>(idToList.entries());
    };




    private func _unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
    };
    
}