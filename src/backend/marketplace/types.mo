import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
module {
    // ledger types
    public type TokenId = Nat;
    public type Operation = {
        #approve;
        #mint;
        #transfer;
        #transferFrom;
    };

 
    public type TransactionStatus = {
        #succeeded;
        #failed;
    };

    public type TxReceipt = {
        #Ok: Nat;
        #Err: {
            #InsufficientAllowance;
            #InsufficientBalance;
            #ErrorOperationStyle;
            #Unauthorized;
            #LedgerTrap;
            #ErrorTo;
            #Other;
            #BlockUsed;
            #AmountTooSmall;
        };
    };

    public type Metadata = {
        logo : Text; // base64 encoded logo or logo url
        name : Text; // token name
        symbol : Text; // token symbol
        decimals : Nat8; // token decimal
        totalSupply : Nat; // token total supply
        owner : Principal; // token owner
        fee : Nat; // fee for update calls
    };

    // Dip20 token interface
    public type IDIP20 = actor {
        transfer : (from: Principal,to: Principal,value:Nat) ->  async TxReceipt;
        transferFrom : (Principal,Principal,Nat) -> async TxReceipt;
        approve: (caller: Principal, spender: Principal, value: Nat) -> async TxReceipt;
        getMetadata: () -> async Metadata;
        symbol: () -> async Text;
    };

    public type dip721Metadata = {
        name: Text;
        url: Text;
        description: Text;
        owner:Principal;
    };
    public type IDIP721 = actor {
       isApprovedForAll: (Principal, Principal) -> async Bool;
       getApproved: (Nat) ->  async Principal;
       ownerOf: (Nat) -> async ?Principal;
       transferFrom: (Principal, Principal, Nat) -> async ();
       transfer: (from:Principal,tokenId:Nat, to:Principal) -> async TxReceipt;
       getTokenInfo: (tokenId: Nat) -> async ?dip721Metadata;
       getAllNfts : () -> async ();
    };
    public type listNft = {
        listId : Nat;
        tokenId: Nat;
        price: Nat;
        seller : Principal;
        name: Text;
        description:Text;
        url : Text;
        status : Text;
    };
    public type boughtList = {
        tokenId : Nat;
        price : Nat;
        seller: Principal;
        buyer : Principal;
    };
    
    //Dip721 interface
  

    public type IStaking = actor {
        isStake: (Principal) -> async Bool;
    };

    //========================================================== Error

    //Error
    public type ApiError = {
        #Unauthorized;
        #InvalidTokenId;
        #InvalidAddress;
        #AddressPaymentAllreadyExist;
        #AddressPaymentNotExist;
        #InvalidAuctionType;
        #Other;
    };
    

    public type Result<T, E> = {
        #Ok: T;
        #Err: E;
    };
}