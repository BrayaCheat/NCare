import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdminCarousel from "@/components/AdminCarousel"

export default function AdminProductPage(){

  const navigateButtons = [
    {
      id: 1,
      label: 'Create',
      icon: <Plus/>,
      href: '/admin/products/add-product'
    },
    {
      id: 2,
      label: 'Views',
      icon: <Plus/>,
      href: '/admin/products/add-product'
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <AdminCarousel/>
      <div className="grid grid-cols-5 gap-6">
        {
          navigateButtons.map(item => (
            <Link href={item.href} key={item.id} className="flex flex-col gap-1 items-center">
              <Button className="rounded-3xl">{item.icon}</Button>
              <span className="font-bold">{item.label}</span>
            </Link>
          ))
        }
      </div>

    </div>
  )
}