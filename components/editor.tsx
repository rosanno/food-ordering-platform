"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ControllerRenderProps } from "react-hook-form";

interface EditorProps {
  field: ControllerRenderProps<any, "content">;
}

const Editor = ({ field }: EditorProps) => {
  return <CKEditor editor={ClassicEditor} {...field} />;
};

export default Editor;
