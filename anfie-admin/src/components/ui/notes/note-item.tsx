"use client";

import { useDebounce } from "@/hooks";
import { Button, Form, Input, Checkbox, Card } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
type TProps = {
  note: TNote;
  onCreateOrUpdateNote: (params: TCreateOrUpdateNoteParams) => void;
  onDelete: (id: string) => void;
};
const NoteItem = ({ note, onCreateOrUpdateNote, onDelete }: TProps) => {
  const [selectedNote, setSelectedNote] = useState<TNote>(note);
  const [form] = Form.useForm();
  const debounceNote: TNote = useDebounce(selectedNote, 500);

  const initialValues = useMemo(() => {
    return {
      content: selectedNote.content,
      title: selectedNote.title,
      isPin: selectedNote.isPin,
    };
  }, [selectedNote]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form, selectedNote]);

  useEffect(() => {
    onCreateOrUpdateNote({
      id: debounceNote.id.toString(),
      form: {
        title: debounceNote.title,
        content: debounceNote.content,
        isPin: debounceNote.isPin,
      },
    });
  }, [debounceNote, onCreateOrUpdateNote]);

  const handleChange = (field: string, value: any) => {
    setSelectedNote((prevNote) => {
      const updatedNote = {
        ...prevNote,
        [field]: value,
      };

      return updatedNote;
    });
  };

  return (
    <div className="conversation-item hover:shadow-md hover:scale-[1.02] w-full h-[350px]">
      <Form form={form} className="w-full">
        <div className="flex justify-between items-center my-4">
          <Form.Item
            name="isPin"
            valuePropName="checked"
            className="mb-0 text-left"
          >
            <Checkbox onChange={(e) => handleChange("isPin", e.target.checked)}>
              Pin
            </Checkbox>
          </Form.Item>
          <Form.Item className="mb-0 text-left">
            <Button
              type="primary"
              className="bg-red-500"
              onClick={() => onDelete(selectedNote.id)}
            >
              Delete
            </Button>
          </Form.Item>
        </div>
        <Form.Item name="title">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 2 }}
            className=""
            placeholder="Title"
            value={selectedNote.title}
            onChange={(e) => handleChange("title", e.target.value)}
            count={{
              show: true,
              max: 128,
            }}
          />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea
            autoSize={{ minRows: 8, maxRows: 8 }}
            count={{
              show: true,
              max: 2048,
            }}
            className="h-[200px]"
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoteItem;
