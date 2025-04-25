import {Card} from '@/components/ui/card'
import { useMemo } from 'react';

export default function WelcomeUser({email}: {email?: string}){

  const greeting = useMemo(() => {
    const hours = new Date().getHours()
    if(hours < 12) return 'Good Morning'
    if(hours < 18) return 'Good Afternoon'
    return 'Good Evening'
  }, [])

  const username = useMemo(() => {
    return email?.split('@')[0]
  }, [email])

  return (
    <Card className='p-3'>
      <div className="flex items-center">
        <h1 className='text-2xl font-bold uppercase'>{greeting} {username}</h1>
      </div>
    </Card>
  )
}