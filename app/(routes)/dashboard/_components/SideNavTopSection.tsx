import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}

export function SideNavTopSection({
  user,
  setActiveTeamInfo,
}: {
  user: any;
  setActiveTeamInfo: any;
}) {
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log(result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-gray-200 p-3 cursor-pointer rounded-lg">
            <Image src="/logo-1.png" alt="logo" height={50} width={50} />
            <h2 className="flex gap-2 font-bold text-[17px]">
              {activeTeam?.teamName} <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          <div>
            {teamList?.map((team, index) => (
              <h2
                className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 transition cursor-pointer ${activeTeam?._id === team?._id && "bg-blue-500 text-white"}`}
                key={index}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName}
              </h2>
            ))}
          </div>
          <Separator className="mt-2" />
          <div>
            {menu.map((item, index) => (
              <h2
                onClick={() => onMenuClick(item)}
                key={index}
                className="flex items-center gap-2 p-2 cursor-pointer rounded-lg text-sm hover:bg-gray-100"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className="flex items-center gap-2 p-2 cursor-pointer rounded-lg text-sm hover:bg-gray-100">
                <LogOut className="h-4 w-4" />
                LogOut
              </h2>
            </LogoutLink>
          </div>
          <Separator className="mt-2" />
          {user && (
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={user?.picture}
                alt="user photo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        className="w-full justify-start gap-2 font-bold mt-8 bg-gray-50"
      >
        <LayoutGrid className="h-5 w-5" />
        All files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
