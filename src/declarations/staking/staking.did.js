export const idlFactory = ({ IDL }) => {
  const ApiError = IDL.Variant({
    'NotStaked' : IDL.Null,
    'ErrorServer' : IDL.Null,
    'NotApproveForStakingOrNotEnoughtToken' : IDL.Null,
    'AmountIsLessThanMinStake' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
    'StakingPackageDoesNotExist' : IDL.Null,
  });
  const StakeResult = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError });
  const Staking = IDL.Service({
    'Stake' : IDL.Func([IDL.Principal, IDL.Nat], [StakeResult], []),
    'getCanisterPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'isStake' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
  });
  return Staking;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
