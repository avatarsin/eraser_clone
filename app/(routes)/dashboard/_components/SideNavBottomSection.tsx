import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Constant from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";

function SideNavBottomSection({
  onFileCreate,
  totalFiles,
}: {
  onFileCreate: any;
  totalFiles: any;
}) {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
    },
    {
      id: 2,
      name: "GitHub",
      icon: Github,
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
    },
  ];
  const [fileInput, setFileInput] = useState("");
  console.log(totalFiles > Constant.MAX_FREE_FILE);

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-1 px-2 text-[14px] cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <menu.icon className="h-5 w-5" />
          {menu.name}
        </h2>
      ))}

      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3">
            New File
          </Button>
        </DialogTrigger>
        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new File</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Write File Name"
                  className="mt-3"
                  onChange={(e) => setFileInput(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 transition"
                  disabled={!fileInput}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>

      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className={`h-4 w-[${(totalFiles / 5) * 100}%] bg-blue-600 rounded-full`}
        ></div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles} </strong>
        out of <strong>{Constant.MAX_FREE_FILE} </strong>
        files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Update your plan for unlimited access.
      </h2>
    </div>
  );
}

export default SideNavBottomSection;
