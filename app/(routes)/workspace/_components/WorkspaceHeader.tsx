import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";

function WorkspaceHeader({ onSave }: { onSave: any }) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src="/logo-1.png" alt="app logo" height={60} width={60} />
        <h2>File Name</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => onSave()}
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600"
        >
          Save <Save className="h-4 w-4" />
        </Button>
        <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
