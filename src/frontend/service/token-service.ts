import { Principal } from "@dfinity/principal";
import { makeTokenActor } from "./actor-locator";

export const adminPrincipalId = process.env.NEXT_PUBLIC_ADMIN_PRINCIPAL_ID;

export const transfer = async (from: string, to: string, value: number) => {
  const actorService = await makeTokenActor();
  const fromId = Principal.fromText(from);
  const toId = Principal.fromText(to);
  const result = await actorService.transfer(fromId, toId, value);

  return result;
};

export const claimOrDeposit = async (to: string, value: number) => {
  const result = await transfer(adminPrincipalId as string, to, value);

  return result;
};
export const chargeFee = async (from: string, value: number) => {
  const result = await transfer(from, adminPrincipalId as string, value);

  return result;
};

export const balanceOf = async (owner: string) => {
  const actorService = await makeTokenActor();
  const ownerId = Principal.fromText(owner);

  const result = await actorService.balanceOf(ownerId);

  return result;
};
