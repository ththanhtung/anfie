import { mutationKeys, queryKeys } from "@/constants";
import { notesService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationNote = () => {
  const queryClient = useQueryClient();

  const { mutate: mutationCreateNote, isPending: isCreateNotePending } =
    useMutation<any, TResponseError, { form: TNoteForm }>({
      mutationKey: [mutationKeys.MUTATION_CREATE_NOTE],
      mutationFn: ({ form }) => notesService.postCreateNote(form),
    });

  const { mutate: mutationUpdateNote, isPending: isUpdateNotePending } =
    useMutation<any, TResponseError, { id: string; form: TNoteForm }>({
      mutationKey: [mutationKeys.MUTATION_UPDATE_NOTE],
      mutationFn: ({ id, form }) => notesService.patchUpdateNote(id, form),
    });

  const onCreateOrUpdateNote = useCallback(
    ({ id, form, cb }: TCreateOrUpdateNoteParams) => {
      if (id) {
        mutationUpdateNote(
          { id, form },
          {
            onError: (error) => {
              message.error(error.message);
            },
            onSuccess: () => {
              cb?.();
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITY_NOTES],
              });
              message.success("Updated note successfully");
            },
          }
        );
        return;
      }
      mutationCreateNote(
        { form },
        {
          onError: (error) => {
            console.log(error);
            message.error("Created note failed!");
          },
          onSuccess: () => {
            cb?.();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITY_NOTES],
            });
            message.success("Created note successfully");
          },
        }
      );
    },
    [mutationCreateNote, mutationUpdateNote, queryClient]
  );

  return {
    onCreateOrUpdateNote,
    isCreateNotePending,
  };
};
