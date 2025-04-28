"use client";

import WelcomeUser from "@/components/WelcomeUser";
import Logout from "@/components/Logout";
import NavigateCard from "@/components/NavigateCard";
import { ChevronRight } from "lucide-react";
import useUserStore from "../store/user";

export default function Admin() {
  const navigateOptions = [
    {
      id: 1,
      label: "Products Page",
      icon: <ChevronRight size={20}/>,
      href: "/admin/products",
    },
  ];
  const {user} = useUserStore()
  return (
    <div className="flex flex-col gap-6">
      <WelcomeUser email={user?.email} />
      <div className="flex-1">
        {navigateOptions.map((item) => (
          <NavigateCard key={item.id} title={item.label} icon={item.icon} url={item.href}/>
        ))}
      </div>
      <Logout />
    </div>
  );
}
