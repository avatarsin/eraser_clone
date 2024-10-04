"use client";

import { useEffect, useState } from "react";
import Editor from "../_components/Editor";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState<any>();
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    console.log(params.fileId);
    params.fileId && getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFilesById, {
      id: params.fileId,
    });
    setFileData(result);
  };

  return (
    <div>
      <WorkspaceHeader
        onSave={() => setTriggerSave((triggerSave: any) => !triggerSave)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        <div className="h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
