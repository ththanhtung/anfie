import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/constants";
import { authService } from "@/services";

export const useSignup = () => {
  const {
    mutateAsync: mutateCreateAccount,
    isPending: isCreateAccountPending,
  } = useMutation<
    TResultResponse<TSignupResponse>,
    TResponseError,
    TFormSignup
  >({
    mutationKey: [mutationKeys.MUTATION_CREATE_ACCOUNT],
    mutationFn: (form) => authService.postSignupUser(form),
  });
  return {
    mutateCreateAccount,
    isCreateAccountPending,
  };
};
