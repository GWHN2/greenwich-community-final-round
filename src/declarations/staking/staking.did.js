export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const StakingPackageCreate = IDL.Record({
    'fee' : IDL.Float64,
    'lockTime' : Time,
    'minStaking' : IDL.Nat,
  });
  const ApiError = IDL.Variant({
    'NotStaked' : IDL.Null,
    'ErrorServer' : IDL.Null,
    'NotApproveForStakingOrNotEnoughtToken' : IDL.Null,
    'AmountIsLessThanMinStake' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
    'StakingPackageDoesNotExist' : IDL.Null,
  });
  const DeleteStakingPackage = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ApiError,
  });
  const StakingInfo = IDL.Record({
    'startTime' : Time,
    'owner' : IDL.Principal,
    'timePoint' : Time,
    'totalProfit' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const StakingPackage = IDL.Record({
    'id' : IDL.Nat,
    'fee' : IDL.Float64,
    'lockTime' : Time,
    'isOff' : IDL.Bool,
    'minStaking' : IDL.Nat,
  });
  const StakeResult = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError });
  const UnStakeResult = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError });
  const Staking = IDL.Service({
    'AddPackage' : IDL.Func([StakingPackageCreate], [IDL.Nat], []),
    'DeleteStakingPackage' : IDL.Func([IDL.Nat], [DeleteStakingPackage], []),
    'GetMyStaking' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(StakingInfo)],
        ['query'],
      ),
    'GetStakingPackage' : IDL.Func([], [IDL.Vec(StakingPackage)], ['query']),
    'Stake' : IDL.Func([IDL.Principal, IDL.Nat, IDL.Nat], [StakeResult], []),
    'Unstake' : IDL.Func([IDL.Principal, IDL.Nat], [UnStakeResult], []),
    'getCanisterPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'isStake' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
  });
  return Staking;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
