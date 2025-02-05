import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/constants";
import { authService } from "@/services";
import { useCallback } from "react";
import { message } from "antd";

export const useSignup = () => {
  const {
    mutateAsync: mutateCreateAccount,
    isPending: isCreateAccountPending,
  } = useMutation<
    TResultResponse<TSignupResponse>,
    TResponseError,
    { form: FormData }
  >({
    mutationKey: [mutationKeys.MUTATION_CREATE_ACCOUNT],
    mutationFn: ({ form }) => authService.postSignupUser(form),
  });

  const onSignup = useCallback(
    ({ form, cb }: { form: FormData; cb?: () => void }) => {
      mutateCreateAccount(
        { form },
        {
          onSuccess: (data) => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutateCreateAccount]
  );
  return {
    onSignup,
    mutateCreateAccount,
    isCreateAccountPending,
  };
};
