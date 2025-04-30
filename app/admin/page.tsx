"use client";

// import WelcomeUser from "@/components/WelcomeUser";
// import Logout from "@/components/Logout";
import NavigateCard from "@/components/NavigateCard";
import { ArchiveIcon } from "lucide-react";
// import useUserStore from "../store/user";
import AdminCarousel from "@/components/AdminCarousel";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const navigateOptions = [
    {
      id: 1,
      label: "Products Management",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      color: "",
    },
    {
      id: 2,
      label: "Mock",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
    {
      id: 3,
      label: "Mock",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
    {
      id: 4,
      label: "Mock",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
  ];
  const quickOptions = [
    {
      id: 1,
      label: "New",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      color: "",
    },
    {
      id: 2,
      label: "Views",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      color: "",
    },
    {
      id: 3,
      label: "Settings",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      color: "",
    },
    {
      id: 4,
      label: "More",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      color: "",
    },
  ];
  // const { user } = useUserStore();
  return (
    <div className="flex flex-col gap-6">
      <AdminCarousel />
      <Card className="grid grid-cols-4 items-center">
        {quickOptions.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-muted-foreground">
              <span>{item.icon}</span>
              <Label className="text-sm">{item.label}</Label>
            </div>
        ))}
      </Card>

      <Card className="flex-1 gap-3">
        {navigateOptions.map((item, index) => (
          <div key={item.id}>
            <NavigateCard title={item.label} icon={item.icon} url={item.href} />
            {index !== navigateOptions.length - 1 && (
              <Separator className="mt-3" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
