'use client'

import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Logout from "@/components/Logout"

export default function Admin() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      const {data, error} = await supabase.auth.getUser()
      setUser(data.user)
      console.log(data.user)
      if(error) toast(error.message)
    }
    loadUser()
  }, [])
  return <>
    <div>
      Admin
      <p>{}</p>

      <Logout/>
    </div>
  </>
}