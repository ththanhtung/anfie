import { LocalKey } from "@/constants";
import { atomWithStorage } from "jotai/utils";

export const userInfoStoreAtom = atomWithStorage(
  LocalKey.USER_INFO,
  {} as TUserInfo
);
