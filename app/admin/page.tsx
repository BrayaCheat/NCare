"use client";

import WelcomeUser from "@/components/WelcomeUser";
import Logout from "@/components/Logout";
import NavigateCard from "@/components/NavigateCard";
import { ArchiveIcon } from "lucide-react";
import useUserStore from "../store/user";
import AdminCarousel from "@/components/AdminCarousel";
import { Card } from "@/components/ui/card";


export default function Admin() {
  const navigateOptions = [
    {
      id: 1,
      label: "Products Management",
      icon: <ArchiveIcon size={18}/>,
      href: "/admin/products",
      color: ''
    },
    {
      id: 2,
      label: "Category Management",
      icon: <ArchiveIcon size={18}/>,
      href: "/admin/products",
      color: ''
    },
  ];
  const {user} = useUserStore()
  return (
    <div className="flex flex-col gap-6">
      <AdminCarousel/>
      <Card className="flex-1 gap-3">
        {navigateOptions.map((item) => (
          <NavigateCard
            key={item.id}
            title={item.label}
            icon={item.icon}
            url={item.href}
          />
        ))}
      </Card>
    </div>
  );
}
