import { mutationKeys, routes } from "@/constants";
import { authService } from "@/services";
import { accessTokenStoreAtom, userInfoStoreAtom } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogin = () => {
  const router = useRouter();
  const setUserInfo = useSetAtom(userInfoStoreAtom);
  const setAccessToken = useSetAtom(accessTokenStoreAtom);

  const { mutate, isPending } = useMutation<
    TResultResponse<TLoginResponse>,
    any,
    any
  >({
    mutationKey: [mutationKeys.MUTATION_LOGIN],
    mutationFn: (form: TFormLogin) => authService.postLoginUser(form),
  });

  const { mutate: mutateAdmin, isPending: isPendingAdmin } = useMutation<
    TResultResponse<TLoginResponse>,
    any,
    any
  >({
    mutationKey: [mutationKeys.MUTATION_LOGIN],
    mutationFn: (form: TFormLogin) => authService.postLoginAdmin(form),
  });

  const onLoginUser = useCallback(
    async (form: TFormLogin, cb?: () => {}) => {
      mutate(form, {
        onError: (error) => {
          message.error(error.response.data.errors[0].message);
        },
        onSuccess: async (data) => {
          const userInfo = data.data.user;
          const accessToken = data.data.tokens;
          setUserInfo({ userId: userInfo.id, ...userInfo });
          setAccessToken(accessToken?.accessToken);
          router.push(routes.CONVERSATIONS);
        },
      });
    },
    [mutate, router, setAccessToken, setUserInfo]
  );

  const onLoginAdmin = useCallback(
    async (form: TFormLoginAdmin, cb?: () => {}) => {
      mutateAdmin(form, {
        onError: (error) => {
          message.error(error.response.data.errors[0].message);
        },
        onSuccess: async (data) => {
          const accessToken = data.data.tokens;
          setAccessToken(accessToken?.accessToken);
          router.push(routes.USERS);
        },
      });
    },
    [mutateAdmin, router, setAccessToken]
  );

  return {
    isPending,
    onLoginUser,
    onLoginAdmin,
    isPendingAdmin,
  };
};
