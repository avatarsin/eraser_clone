"use client";

import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
//@ts-ignore
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

function Editor({ onSaveTrigger, fileId, fileData }: any) {
  const ref = useRef<EditorJS>();
  const [document, setDocument] = useState(rawDocument);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    console.log(onSaveTrigger);
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",

      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Test Heading",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
      },
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          }).then((resp) => {
            toast("Document updated successfully!");
          });
        })
        .catch((error) => {
          toast("error while updating the document");
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
}

export default Editor;
