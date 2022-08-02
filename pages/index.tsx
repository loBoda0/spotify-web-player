import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'

const Home: NextPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      <main className="flex overflow-y-scroll scrollbar-hide">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky h-24">
        <Player />
      </div>
      
    </div>
  )
}

export default Home