import { Nat } from "@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";
import { makeTokenActor } from "./actor-locator";

export const approve = async (spender: string, value: number) => {
  const actorService = await makeTokenActor();
  const spenderId = Principal.fromText(spender);
  const result = await actorService.approve(spenderId, value);

  return result;
};

export const transfer = async (from: string, to: string, value: number) => {
  const actorService = await makeTokenActor();
  const fromId = Principal.fromText(from);
  const toId = Principal.fromText(to);
  // const bigintValue = value.to
  const result = await actorService.transfer(fromId, toId, value);

  return result;
};

export const balanceOf = async (owner: string) => {
  const actorService = await makeTokenActor();
  const ownerId = Principal.fromText(owner);

  const result = await actorService.balanceOf(ownerId);

  return result;
};
