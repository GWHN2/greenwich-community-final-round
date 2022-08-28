import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int = "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Types "types";


shared(msg) actor class DAO(staking : Principal) = Self{
    private stable var eventIdCount : Nat = 0;
    private type EventId = Nat;
    private stable var eventStore: [(Nat, Types.Event)] = [];
    private stable var eventMetadataStore: [(Nat, Types.eventmetadata)] = [];
    private var idToEvent: HashMap.HashMap<Nat, Types.Event> = HashMap.fromIter(eventStore.vals(), 10, Nat.equal, Hash.hash);
    stable var nextEventId : Nat = 0;
    stable var nextEventPendingId : Nat = 0;
    private stable var eventToVotesStore:[(Nat,[(Principal,Types.Vote)])] = [];
    private stable var eventPendingStore: [(Nat, Types.EventPending)] = [];
    private stable var eventPendingStoreCreate: [(Nat, Types.EventPendingCreate)] = [];
    private var idToEventMetadata= HashMap.HashMap<Nat, HashMap.HashMap<Principal, Types.eventmetadata>>(1, Nat.equal, Hash.hash);
    private var idToEventPending: HashMap.HashMap<Nat, Types.EventPending> = HashMap.fromIter(eventPendingStore.vals(), 10, Nat.equal, Hash.hash);
    private var stakeProvider : Types.IStaking = actor(Principal.toText(staking)) : Types.IStaking;
    private var eventPendingToVotes = HashMap.HashMap<Nat, HashMap.HashMap<Principal, Types.Vote>>(1, Nat.equal, Hash.hash);
      private var idToEventPendingCreate: HashMap.HashMap<Nat, Types.EventPendingCreate> = HashMap.fromIter(eventPendingStoreCreate.vals(), 10, Nat.equal, Hash.hash);


    public shared(msg) func CreateEvent(event : Types.Event) : async Types.CreateEventResult {
        let id = nextEventId;
        nextEventId += 1;
        
        return #Ok(true);
    };
    public shared(msg) func CreateEventPending(caller: Principal,eventPending : Types.EventPendingCreate) : async Types.EventPendingResult{
        nextEventPendingId += 1;
        let id = nextEventPendingId;
        idToEventPendingCreate.put(id, eventPending);
        let metadata_temp = {
            eventPendingId = id;
            eventVote = #Up;
        };
        idToEventPending.put(id, {
            id = id;
            title = eventPending.title;
    description = eventPending.description;
        eventmaker = caller;
        voteUp = 0;
        voteDown = 0;
        timePending = eventPending.timePending;
        });
        let tmp = HashMap.HashMap<Principal, Types.eventmetadata>(1, Principal.equal, Principal.hash);
        tmp.put(caller, metadata_temp);
        idToEventMetadata.put(id, tmp);
        return #Ok(true);
    };
    public shared(msg) func GetAllEventPending() : async[(EventId, Types.EventPending)]{
        return Iter.toArray<(EventId, Types.EventPending)>(idToEventPending.entries());
    };
    public shared(msg) func VoteCreateEvent(caller : Principal,eventPendingId:Nat,vote:Text) : async Types.EventPendingResult{
        if (Principal.isAnonymous(caller)) {
			return #Err(#Unauthorized);
		};
        let check = await stakeProvider.isStake(caller);
        if(not check){
            return #Err(#NotValidator);
        };
        switch(idToEventPending.get(eventPendingId)){
            
            case (?eventPendingData){
                switch(vote){
                    case("Up"){
                        let newEventPending={
                            id = eventPendingId;
                            title = eventPendingData.title;
                            description = eventPendingData.description;
                            eventmaker = caller;
                            voteUp = eventPendingData.voteUp + 1;
                            voteDown = eventPendingData.voteDown;
                            timePending = eventPendingData.timePending;
                        };
                        idToEventPending.put(eventPendingId, newEventPending);
                    };
                    case("Down"){
                        let newEventPending={
                            id = eventPendingId;
                            title = eventPendingData.title;
                            description = eventPendingData.description;
                            eventmaker = caller;
                            voteUp = eventPendingData.voteUp;
                            voteDown = eventPendingData.voteDown + 1;
                            timePending = eventPendingData.timePending;
                        };
                        idToEventPending.put(eventPendingId, newEventPending);
                    };
                };
                
            };
            case null{
                return #Err(#Other);
            };
            
        };
        return #Ok(true);
    };
    private func _unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
    };
    public shared query(msg) func IsVotedEvent(caller:Principal, idEventPending:Nat) :async Bool{
        return _isVotedEventPending(idEventPending,caller);
    };
    private func _isVotedEventPending(idEventPending:Nat, address:Principal):Bool{
        switch(eventPendingToVotes.get(idEventPending)){
            case null {return false};
            case(?votes){
                switch(votes.get(address)){
                    case null {return false};
                    case(?vote) {return true};
                };
            };
        };
    };
    public shared(msg) func ApproveEventPending(idEventPending:Nat) : async Types.ApproveEventPendingResult{
        switch(idToEventPending.get(idEventPending)){
            case null {return #Err(#Other)};
            case(?eventPendingData){
                        eventIdCount += 1;
                        let id = eventIdCount;
                        let event:Types.Event={
                            id = eventIdCount;
                            title = eventPendingData.title;
                            description = eventPendingData.description;
                            eventmaker = eventPendingData.eventmaker;
                        };
                        idToEvent.put(id,event);
                        idToEventPending.delete(idEventPending);
                        return #Ok(true);
            };
        };
    };
    private func _automaticAcceptEventPending(): async (){
        Iter.iterate(
            idToEventPending.entries(),func ((eventId: Nat, pendingEvent: Types.EventPending),  index: Nat) {
                if(Time.now() <=pendingEvent.timePending){
                    eventIdCount += 1;
                    let id = eventIdCount;
                    let event: Types.Event={
                        id = eventIdCount;
                        title = pendingEvent.title;
                        description = pendingEvent.description;
                        eventmaker = pendingEvent.eventmaker;
                    };
                    if(pendingEvent.voteUp > pendingEvent.voteDown){
                        idToEvent.put(id,event);
                        idToEventPending.delete(eventId);
                    };
                }
            });
        

    };
    system func heartbeat() : async(){
		await _automaticAcceptEventPending();
    };
    system func preupgrade() {
		var eventVotes = Iter.toArray(eventPendingToVotes.entries());
		var sizeVotes : Nat = eventVotes.size();
		var tempVotes : [var (Nat, [(Principal, Types.Vote)])] = Array.init<(Nat, [(Principal, Types.Vote)])>(sizeVotes, (0,[]));
		sizeVotes := 0;
		for ((k, v) in eventPendingToVotes.entries()) {
			tempVotes[sizeVotes] := (k, Iter.toArray(v.entries()));
			sizeVotes += 1;
		};
		eventToVotesStore := Array.freeze(tempVotes);
		
	};
	
	system func postupgrade() {
		eventStore := [];
		eventPendingStore := [];
	};

};