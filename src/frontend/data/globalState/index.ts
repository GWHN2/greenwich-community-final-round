import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserRole, EditingItem, SessionData, UserData } from "../type";

const { persistAtom } = recoilPersist();
export const SessionDataState = atom({
  key: "SessionDataState",
  default: {} as SessionData,
});

export const SideBarState = atom({
  key: "SideBarState",
  default: true,
});

export const OpeningIndexState = atom({
  key: "OpeningIndexState",
  default: 0,
});

export const ShowingModalState = atom({
  key: "ShowingModalState",
  default: "",
});

export const UserRoleState = atom({
  key: "UserRoleState",
  default: "Student" as UserRole,
  effects_UNSTABLE: [persistAtom],
});

export const EditingItemIdState = atom({
  key: "EditingItemIdState",
  default: null as string | null,
});

export const TransferringIdState = atom({
  key: "TransferringIdState",
  default: null as number | null,
});
export const ListingPriceState = atom({
  key: "ListingPriceState",
  default: null as number | null,
});

export const UserDataState = atom<UserData>({
  key: "UserDataState",
  default: {} as UserData,
  effects_UNSTABLE: [persistAtom],
});

export const ListingStatusNFTState = atom<string[]>({
  key: "ListingStatusNFTState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const IsStakeholderState = atom<boolean>({
  key: "IsStakeholderState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const VotedStakeHolderState = atom<
  { principalId: string; eventPendingId: number }[]
>({
  key: "VotedStakeHolderState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
