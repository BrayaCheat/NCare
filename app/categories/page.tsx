import NavigateCard from "@/components/NavigateCard";
import { Card } from "@/components/ui/card";

export default function CategoryPage(){
  const navigateButtons = [
    {
      id: 1,
      label: "Add new category",
      href: "/admin/categories/add-category",
      description: "Adding new category & display on store.",
      color: 'bg-primary'
    },
    {
      id: 2,
      label: "View all category",
      href: "/admin/categories/view-category",
      description: "Seeing list of categories & Managing on categories",
      color: 'bg-primary'
    },
  ];

  return (
    <Card className="flex flex-col gap-6">
      {navigateButtons.map((item) => (
          <NavigateCard
            key={item.id}
            url={item.href}
            title={item.label}
            color={item.color}
            description={item.description}
          />
      ))}
    </Card>
  );
}