import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
module{
public type eventmetadata = {
    eventPendingId: Nat;
    eventVote : Vote;
};
public type Vote = {
    #Up;
    #Down;
};

public type Result<T, E> = {
        #Ok: T;
        #Err: E;
    };
public type IStaking = actor {
        isStake: (Principal) -> async Bool;
};
public type EventPendingError = {
        #Unauthorized;
        #NotValidator;
        #InvalidTokenId;
        #InvalidAddress;
        #AlreadyVoted;
        #TimeVoteIsExpired;
        #NotSeller;
        #MarketNotEnoughtToken;
        #NotManager;
        #Other;
};

public type EventPending = {
        id:Nat;
        title:Text;
        description:Text;
        eventmaker: Principal;
        voteUp: Nat;
        voteDown: Nat;
        timePending: Time.Time;
};
public type EventPendingCreate = {
        title:Text;
        description:Text;
        eventmaker: Principal;
        voteUp: Nat;
        voteDown: Nat;
        timePending: Time.Time;
};
public type Event = {
    id:Nat;
    title:Text;
    description:Text;
    eventmaker: Principal;
};
public type CreateEventResult = Result<Bool,EventPendingError>;
public type EventPendingResult = Result<Bool,EventPendingError>;
public type ApproveEventPendingResult = Result<Bool,EventPendingError>;
};