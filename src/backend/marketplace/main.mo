import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int = "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Types "types";
shared(msg) class actor Marketplace(dip20 : Principal, dip721: Principal, staking: Principal)= Self{
    public type Time = Time.Time;
    private var owner = msg.caller;
    private var uogTokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
    private var nftProvider: Types.IDIP721 = actor(Principal.toText(dip721)) : Types.IDIP721;
	private var stakeProvider: Types.IStaking = actor(Principal.toText(staking)) : Types.IStaking;
    private stable var fee = 1;

    
}