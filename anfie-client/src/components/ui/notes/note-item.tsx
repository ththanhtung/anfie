"use client";

import { useDebounce } from "@/hooks";
import { Button, Form, Input, Checkbox } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
type TProps = {
  note: TNote;
  onCreateOrUpdateNote: (params: TCreateOrUpdateNoteParams) => void;
};
const NoteItem = ({ note, onCreateOrUpdateNote }: TProps) => {
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
  }, [initialValues, form]);

  useEffect(() => {
    // console.log({ debounceNote });

    onCreateOrUpdateNote({
      id: debounceNote.id.toString(),
      form: {
        title: debounceNote.title,
        content: debounceNote.content,
        isPin: debounceNote.isPin,
      },
    });
  }, [debounceNote, onCreateOrUpdateNote]);

  // useEffect(() => {
  //   console.log({ debounceNote });
  //   console.log({ selectedNote });
  // }, [debounceNote, selectedNote]);

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
    <div className="conversation-item hover:shadow-md hover:scale-[1.02] w-full h-[300px]">
      <Form form={form} className="w-full">
        <Form.Item
          name="isPin"
          valuePropName="checked"
          className="mb-0 text-left"
        >
          <Checkbox onChange={(e) => handleChange("isPin", e.target.checked)}>
            Pin
          </Checkbox>
        </Form.Item>
        <Form.Item name="title">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 2 }}
            className=""
            placeholder="Title"
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            className="h-[200px]"
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full capitalize bg-green-500"
        >
          done
        </Button>
      </Form>
    </div>
  );
};

export default NoteItem;
