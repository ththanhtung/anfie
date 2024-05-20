"use client";
import { LayoutNote, MessagePanel, NoteItem } from "@/components";
import { useSocketContext } from "@/configs";
import { queryKeys } from "@/constants";
import { useListInfiniteNotes, useMutationNote } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Button, List } from "antd";
import React, { useCallback, useEffect } from "react";

const NotePage = () => {
  const queryClient = useQueryClient();
  const { onCreateOrUpdateNote } = useMutationNote();
  const [valueChecked, setValueChecked] = React.useState<number>();
  const [selectedNote, setSelectedNote] = React.useState<TNote>();
  const { notes } = useListInfiniteNotes();

  console.log({ notes });

  const handleAddNote = useCallback(() => {
    onCreateOrUpdateNote({ form: {} });
  }, [onCreateOrUpdateNote]);

  const renderLeft = useCallback(() => {
    return (
      <div className="text-center p-8">
        <Button type="primary" className="w-full mb-2" onClick={handleAddNote}>
          Add Note
        </Button>
        <List
          className=""
          dataSource={notes}
          renderItem={(item: TNote) => (
            <NoteItem note={item} onCreateOrUpdateNote={onCreateOrUpdateNote} />
          )}
        />
      </div>
    );
  }, [handleAddNote, notes, onCreateOrUpdateNote]);

  const NoteDoneItems = (
    <div className="text-center p-8">
      <h1>Done</h1>
      <List
        className=""
        dataSource={notes}
        renderItem={(item: TNote) => (
          <NoteItem note={item} onCreateOrUpdateNote={onCreateOrUpdateNote} />
        )}
      />
    </div>
  );
  return (
    <>
      <div className="w-[calc(100%-250px)]">
        <h1 className="text-center text-blue-600 my-4">Notes</h1>
        <LayoutNote renderLeft={renderLeft()}>{NoteDoneItems}</LayoutNote>
      </div>
    </>
  );
};

export default NotePage;
