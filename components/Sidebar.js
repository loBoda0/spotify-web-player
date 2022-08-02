import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { HiHome,
  HiOutlineSearch,
  HiLibrary,
  HiPlusCircle,
  HiHeart,
  HiRss,
  HiLogout
} from 'react-icons/hi'

const Sidebar = () => {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const getPlaylistData = async () => {
      const token = session.user.accessToken
      console.log(token)
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': "application.json"
        }
      })
      const { items } = response.data
      const playlists = items.map(({name, id}) => {
        return { name, id }
      })
      setPlaylists(playlists)
    }
    getPlaylistData()
  }, [session])

  return (
    <div className='w-[250px] bg-purple-400/25 rounded-lg p-[10px] m-[10px] overflow-y-auto scrollbar-hide'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 w-full rounded hover:bg-purple-400/50'>
                <HiLogout className='h-5 w-5' />
                <p>Sign Out</p>
            </button>
            <button className='flex items-center space-x-2 w-full rounded hover:bg-purple-400/50'>
                <HiHome className='h-5 w-5' />
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-gray-500'>
                <HiOutlineSearch className='h-5 w-5' />
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-gray-500'>
                <HiLibrary className='h-5 w-5' />
                <p>Your Library</p>
            </button>
						<hr className='border-t-[0.1px] border-gray-900' />

            <button className='flex items-center space-x-2 hover:text-gray-500'>
                <HiPlusCircle className='h-5 w-5' />
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-gray-500'>
                <HiHeart className='h-5 w-5' />
                <p>Your Library</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-gray-500'>
                <HiRss className='h-5 w-5' />
                <p>Your episodes</p>
            </button>
						<hr className='border-t-[0.1px] border-gray-900' />

            {playlists.map((playlist) => {
              return (
                <p key={playlist.id} /* onClick={() => setPlaylistId(playlist.id)} */ className="cursor-pointer hover:text-gray-500">
                  {playlist.name}
                </p>
              )
            })}

      </div>
    </div>
  )
}

export default Sidebar