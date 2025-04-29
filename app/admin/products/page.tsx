import { ChevronRight } from "lucide-react";
import NavigateCard from "@/components/NavigateCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminProductPage() {
  const navigateButtons = [
    {
      id: 1,
      label: "Create",
      icon: <ChevronRight size={20} />,
      href: "/admin/products/add-product",
      description: "Adding new products & display on store.",
    },
    {
      id: 2,
      label: "Views",
      icon: <ChevronRight size={20} />,
      href: "/admin/products/view-product",
      description: "Seeing list of products & Managing on products",
    },
  ];

  return (
    <Card className="flex flex-col gap-3">
      {navigateButtons.map((item, index) => (
        <div key={item.id}>
          <NavigateCard
            url={item.href}
            title={item.label}
            icon={item.icon}
            description={item.description}
          />
          {index !== navigateButtons.length - 1 && (
            <Separator className="mt-3"/>
          )}
        </div>
      ))}
    </Card>
  );
}
