import { LocalKey } from "@/constants";
import { atomWithStorage } from "jotai/utils";

export const accessTokenStoreAtom = atomWithStorage(
  LocalKey.ACCESS_TOKEN_LOCALKEY, ''
);
