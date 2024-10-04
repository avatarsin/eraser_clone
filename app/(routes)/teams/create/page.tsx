"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = async () => {
    createTeam({
      teamName,
      createdBy: user?.email,
    }).then((resp) => {
      if (resp) {
        router.push("/dashboard");
        toast("Team created successfully!!");
      }
    });
  };

  return (
    <div className="md:px-16 px-10 my-16">
      <Image src="/logo-black.png" alt="logo" width={100} height={100} />
      <div className="flex flex-col items-center mt-8 mb-7">
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h2>
        <h4 className="text-gray-500">
          You can always change this later from settings
        </h4>
        <div>
          <label className="text-gray-500">Team Name</label>
          <Input
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="mt-3"
          />
        </div>
        <Button
          onClick={() => createNewTeam()}
          disabled={!(teamName && teamName?.length > 0)}
          className="bg-blue-500 mt-9 w-[40%] hover:bg-blue-700"
        >
          Create Team
        </Button>
      </div>
    </div>
  );
}

export default CreateTeam;
