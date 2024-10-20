"use client";
import { LayoutNote, NoteItem } from "@/components";
import { useListInfiniteNotes, useMutationNote } from "@/hooks";
import { Button, List } from "antd";
import React, { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const NotePage = () => {
  const { onCreateOrUpdateNote, onDeleteNote } = useMutationNote();
  const { notes, total: totalNotes, fetchNextPage } = useListInfiniteNotes();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log({ notes });

  const handleAddNote = useCallback(() => {
    onCreateOrUpdateNote({ form: {} });
  }, [onCreateOrUpdateNote]);

  const NoteDoneItems = (
    <div className="text-center w-full p-6">
      <Button type="primary" className="w-full mb-2" onClick={handleAddNote}>
        Add Note
      </Button>

      <div className="grid grid-cols-2 gap-4">
        {notes?.map((note: TNote) => (
          <NoteItem
            key={note.id}
            note={note}
            onCreateOrUpdateNote={onCreateOrUpdateNote}
            onDelete={(id) => {
              console.log({ id });
              
              onDeleteNote({
                id,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
  return (
    <>
      <div className="w-[calc(100%-250px)]">
        <h1 className="text-center text-blue-600 my-4">Notes</h1>
        <LayoutNote>{NoteDoneItems}</LayoutNote>
        {notes?.length > 9 && notes?.length !== totalNotes && <div ref={ref} />}
      </div>
    </>
  );
};

export default NotePage;
