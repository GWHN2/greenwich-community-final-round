export const idlFactory = ({ IDL }) => {
  const EventPendingError = IDL.Variant({
    'AlreadyVoted' : IDL.Null,
    'InvalidAddress' : IDL.Null,
    'InvalidTokenId' : IDL.Null,
    'NotSeller' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
    'MarketNotEnoughtToken' : IDL.Null,
    'NotManager' : IDL.Null,
    'TimeVoteIsExpired' : IDL.Null,
    'NotValidator' : IDL.Null,
  });
  const ApproveEventPendingResult = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : EventPendingError,
  });
  const Event = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'eventmaker' : IDL.Principal,
  });
  const CreateEventResult = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : EventPendingError,
  });
  const Time = IDL.Int;
  const EventPendingCreate = IDL.Record({
    'title' : IDL.Text,
    'voteDown' : IDL.Nat,
    'description' : IDL.Text,
    'voteUp' : IDL.Nat,
    'timePending' : Time,
    'eventmaker' : IDL.Principal,
  });
  const EventPendingResult = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : EventPendingError,
  });
  const EventId = IDL.Nat;
  const EventPending = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'voteDown' : IDL.Nat,
    'description' : IDL.Text,
    'voteUp' : IDL.Nat,
    'timePending' : Time,
    'eventmaker' : IDL.Principal,
  });
  const DAO = IDL.Service({
    'ApproveEventPending' : IDL.Func(
        [IDL.Nat],
        [ApproveEventPendingResult],
        [],
      ),
    'CreateEvent' : IDL.Func([Event], [CreateEventResult], []),
    'CreateEventPending' : IDL.Func(
        [IDL.Principal, EventPendingCreate],
        [EventPendingResult],
        [],
      ),
    'GetAllEventPending' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(EventId, EventPending))],
        [],
      ),
    'IsVotedEvent' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], ['query']),
    'VoteCreateEvent' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Text],
        [EventPendingResult],
        [],
      ),
  });
  return DAO;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
