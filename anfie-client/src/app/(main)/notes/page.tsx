"use client";
import { LayoutNote, NoteItem } from "@/components";
import { useListInfiniteNotes, useMutationNote } from "@/hooks";
import { Button, List } from "antd";
import React, { useCallback } from "react";

const NotePage = () => {
  const { onCreateOrUpdateNote } = useMutationNote();
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
