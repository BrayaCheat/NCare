import { ChevronRight } from "lucide-react"
import AdminCarousel from "@/components/AdminCarousel"
import NavigateCard from "@/components/NavigateCard"

export default function AdminProductPage(){

  const navigateButtons = [
    {
      id: 1,
      label: 'Create',
      icon: <ChevronRight size={20}/>,
      href: '/admin/products/add-product',
      description: 'Adding new products & display on store.'
    },
    {
      id: 2,
      label: 'Views',
      icon: <ChevronRight size={20}/>,
      href: '/admin/products/add-product',
      description: 'Seeing list of products & Managing on products'
    }
  ]

  return (
      <div className="flex flex-col gap-6">
        {
          navigateButtons.map(item => (
            <NavigateCard key={item.id} url={item.href} title={item.label} icon={item.icon} description={item.description}/>
          ))
        }
      </div>
  )
}