import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApproveEventPendingResult = { 'Ok' : boolean } |
  { 'Err' : EventPendingError };
export type CreateEventResult = { 'Ok' : boolean } |
  { 'Err' : EventPendingError };
export interface DAO {
  'ApproveEventPending' : ActorMethod<[bigint], ApproveEventPendingResult>,
  'CreateEvent' : ActorMethod<[Event], CreateEventResult>,
  'CreateEventPending' : ActorMethod<
    [Principal, EventPendingCreate],
    EventPendingResult,
  >,
  'GetAllEventPending' : ActorMethod<[], Array<[EventId, EventPending]>>,
  'IsVotedEvent' : ActorMethod<[Principal, bigint], boolean>,
  'VoteCreateEvent' : ActorMethod<
    [Principal, bigint, string],
    EventPendingResult,
  >,
}
export interface Event {
  'id' : bigint,
  'title' : string,
  'description' : string,
  'eventmaker' : Principal,
}
export type EventId = bigint;
export interface EventPending {
  'id' : bigint,
  'title' : string,
  'voteDown' : bigint,
  'description' : string,
  'voteUp' : bigint,
  'timePending' : Time,
  'eventmaker' : Principal,
}
export interface EventPendingCreate {
  'title' : string,
  'voteDown' : bigint,
  'description' : string,
  'voteUp' : bigint,
  'timePending' : Time,
  'eventmaker' : Principal,
}
export type EventPendingError = { 'AlreadyVoted' : null } |
  { 'InvalidAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'NotSeller' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null } |
  { 'MarketNotEnoughtToken' : null } |
  { 'NotManager' : null } |
  { 'TimeVoteIsExpired' : null } |
  { 'NotValidator' : null };
export type EventPendingResult = { 'Ok' : boolean } |
  { 'Err' : EventPendingError };
export type Time = bigint;
export interface _SERVICE extends DAO {}
