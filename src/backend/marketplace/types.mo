import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
module {
    // ledger types
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
        transfer : (Principal,Principal,Nat) ->  async TxReceipt;
        transferFrom : (Principal,Principal,Nat) -> async TxReceipt;
        approve: (caller: Principal, spender: Principal, value: Nat) -> async TxReceipt;
        getMetadata: () -> async Metadata;
        symbol: () -> async Text;
    };

    public type dip721Metadata = {
        name: Text;
        url: Text;
        description: Text;
    };
    
    //Dip721 interface
    public type IDIP721 = actor {
       isApprovedForAll: (Principal, Principal) -> async Bool;
       getApproved: (Nat) ->  async Principal;
       ownerOf: (Nat) -> async ?Principal;
       transferFrom: (Principal, Principal, Nat) -> async ();
       transfer: (tokenId: Nat, to: Principal) -> async TxReceipt;
       getTokenInfo: (tokenId: Nat) -> async ?dip721Metadata;
    };

    public type IStaking = actor {
        isStake: (Principal) -> async Bool;
    };


    //========================================================== Become seller
    public type Seller = {
        id: Principal;
        username: Text;
        email: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type SellerCreate = {
        username: Text;
        email: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type SellerUpdate = {
        username: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type ApiSellerError = {
        #Unauthorized;
        #InvalidData;
        #AlreadySeller;
        #NotSeller;
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

    public type SupportedPaymentResult = Result<Bool, ApiError>;
    public type CancelOrderResult = Result<Bool, AuctionError>;
    public type ManageResult = Result<Bool, AuctionError>;

    public type SellerErrorResult = Result<Bool, ApiSellerError>;
}