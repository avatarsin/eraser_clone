"use client";

import { api } from "@/convex/_generated/api";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

function Canvas({ onSaveTrigger, fileId, fileData }: any) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteBoard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    onSaveTrigger && saveWhiteBoard();
    console.log(JSON.stringify(whiteBoardData));
  }, [onSaveTrigger, whiteBoardData]);

  const saveWhiteBoard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    })
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ height: "700px" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
