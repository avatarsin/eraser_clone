import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { FilesListContext } from "@/app/_context/FilesListContext";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FilesListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      whiteboard: "",
      document: "",
      archive: false,
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully");
        }
      },
      (e) => {
        console.log(e);

        toast("Error while creating file");
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
    console.log(result);
  };

  return (
    <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(active: TEAM) => setActiveTeam(active)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav;
