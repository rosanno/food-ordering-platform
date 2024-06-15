"use client";

import { useImperativeHandle, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@ckeditor/ckeditor5-core/src/editor/editor";

interface CustomEditorProps {
  field: ControllerRenderProps<any, "content">;
}

const CustomEditor = ({ field }: CustomEditorProps) => {
  const editorRef = useRef<Editor | null>(null);

  useImperativeHandle(field.ref, () => ({
    focus: () => {
      if (editorRef.current) {
        editorRef.current.editing.view.focus();
      }
    },
  }));

  return (
    <CKEditor
      data={field.value}
      editor={ClassicEditor}
      {...field}
      onReady={(editor) => {
        editorRef.current! = editor;
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        field.onChange(data);
      }}
      onBlur={(event, editor) => {
        const data = editor.getData();
        field.onBlur();
      }}
      onFocus={(event, editor) => {
        console.log("Focus", editor);
      }}
      onError={(error) => {
        console.log(error);
      }}
    />
  );
};

export default CustomEditor;
