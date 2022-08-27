import Array "mo:base/Array";
import Error "mo:base/Error";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int64 "mo:base/Int64";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Types "types";

shared(msg) actor class Staking(dip20: Principal) = Self {
    private var owner = msg.caller;
    private stable var idCounter: Nat = 1;

    private var tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;

    private stable var stakings: [(Nat, Types.StakingPackage)] = [];
    private stable var stakingInfo: [(Principal, [(Nat, Types.StakingInfo)])] = [];
    private var idToStakingPackage: HashMap.HashMap<Nat, Types.StakingPackage> = HashMap.fromIter(stakings.vals(), 10, Nat.equal, Hash.hash);
    private var addressToStaking = HashMap.HashMap<Principal, HashMap.HashMap<Nat, Types.StakingInfo>>(1, Principal.equal, Principal.hash);
    private var isStaker = HashMap.HashMap<Principal, Bool>(1, Principal.equal, Principal.hash);
    private stable var amount_stable : Nat = 500;
    public shared(msg) func Stake(caller: Principal, amount: Nat): async Types.StakeResult {
        if(amount <= amount_stable) {
            return #Err(#NotApproveForStakingOrNotEnoughtToken);
        };
        isStaker.put(caller, true);
        return #Ok(true);
    
    };



    public query func isStake(address: Principal): async Bool {
        if(isStaker.get(address) == null) {
            return false;
        };
        return true;
    };

	private func _transferToken(from: Principal, to: Principal, amount: Nat) : async Bool {
		try{
			var resp = await tokenProvider.transferFrom(from, to, amount);
			switch (resp) {
				case (#Ok(id)) {
					return true
				};
				case (_) {
					return false;
				};
			};
		}catch(e) {
			return false;
		};
	};

    private func _calculateProfit(
        timeStart: Time.Time, 
        timeLock: Time.Time,
        amount: Nat,
        fee: Float,
    ): async Nat {
        if (fee == 0) {
            return amount;
        };
        var profit = Nat64.div(
                        Nat64.mul(
                            Nat64.fromIntWrap(Time.now() - timeStart), 
                            Nat64.mul(
                                Nat64.fromNat(amount), 
                                Nat64.fromIntWrap(Float.toInt(fee)))), 
                    Nat64.fromIntWrap(timeLock));

        return Nat64.toNat(profit);
    };

    private func _unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
    };

    public shared query func getCanisterPrincipal() : async Principal {
		return Principal.fromActor(Self);
	};
}