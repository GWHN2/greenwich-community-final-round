import { Principal } from "@dfinity/principal";
import { makeDaoActor } from "./actor-locator";

export type Metadata = {
  title: string;
  description: string;
  timePending: number;
};

export const getAllEventPending = async () => {
  const actorService = await makeDaoActor();
  const result = await actorService.GetAllEventPending();
  return result;
};

export const createEventPending = async (
  caller: string,
  metadata: Metadata
) => {
  const actorService = await makeDaoActor();
  const PrincipalId = Principal.fromText(caller);

  const eventPending = {
    ...metadata,
    eventmaker: PrincipalId,
    voteUp: 0,
    voteDown: 0,
  };

  const stakeResult = await actorService.CreateEventPending(
    PrincipalId,
    eventPending
  );

  return stakeResult;
};
export const voteCreateEvent = async (
  caller: string,
  eventPendingId: number,
  vote: "Up" | "Down"
) => {
  const actorService = await makeDaoActor();
  const PrincipalId = Principal.fromText(caller);

  const stakeResult = await actorService.VoteCreateEvent(
    PrincipalId,
    eventPendingId,
    vote
  );

  return stakeResult;
};
