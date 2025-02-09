import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/constants";
import { authService } from "@/services";
import { useCallback } from "react";
import { message } from "antd";

export const useMutationChangePassword = () => {
  const {
    mutateAsync: mutationChangePassword,
    isPending: isChangePasswordPending,
  } = useMutation<
    TResultResponse<[]>,
    TResponseError,
    { form: TFormChangePassword }
  >({
    mutationKey: [mutationKeys.MUTATION_CREATE_ACCOUNT],
    mutationFn: ({ form }) =>
      authService.patchChangePassword(form),
  });

  const onChangePassword = useCallback(
    ({ form, cb }: { form: TFormChangePassword; cb?: () => void }) => {
      mutationChangePassword(
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
    [mutationChangePassword]
  );
  return {
    onChangePassword,
    isChangePasswordPending
  };
};
