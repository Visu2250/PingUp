import React from 'react'
import { CheckCircle } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Calendar, PenBox } from 'lucide-react'
import moment from 'moment'



const UserProfileInfo = ({user,posts,profileId, setShowEdit}) => {
  return (
   <div className='relative py-4 px-6 md:px-8 bg-white'>
  <div className='flex flex-col md:flex-row items-start gap-6'>
    <div className='w-32 h-32 border-4 border-white shadow-lg absolute -top-16 rounded-full overflow-hidden'>
  <img src={user.profile_picture} alt="" className='w-full h-full object-cover rounded-full'/>
</div>


   <div className='w-full pt-16 md:pt-0 md:pl-36'>
  <div className='flex flex-col md:flex-row items-start justify-between'>
    <div>
      <div className='flex items-center gap-3'>
        <h1 className='text-2xl font-bold text-gray-900'>{user.full_name}</h1>
        {/* 'Verified' component (Assuming it's an icon like CheckCircle from Lucide or a custom component) */}
        <CheckCircle className='w-6 h-6 text-blue-500' />

      </div>
      
      {/* Username or Placeholder */}
      <p className='text-gray-600'>{user.username ? `@${user.username}` : 'Add a username'}</p>
    </div>
    {/* if user is not on others profile that means he is opening his profile so we well give edit button  */}
    {!profileId && 
    <button 
  onClick={() => setShowEdit(true)} 
  className='flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors mt-4 md:mt-0 cursor-pointer'
>
  <PenBox className='w-4 h-4'/> 
        Edit
    </button>}
  </div>
  <p className='text-gray-700 text-sm max-w-md mt-4'>{user.bio}</p>

<div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4'>
  
  {/* Location */}
  <span className='flex items-center gap-1.5'>
    {/* MapPin Icon (assuming MapPin is imported) */}
    <MapPin className='w-4 h-4' />
    {user.location ? user.location : 'Add location'}
  </span>

  {/* Join Date */}
  <span className='flex items-center gap-1.5'>
    {/* Calendar Icon (assuming Calendar is imported) */}
    <Calendar className='w-4 h-4' />
    Joined <span className='font-medium'>{moment(user.createdAt).fromNow()}</span>
  </span>
</div>

<div className='flex items-center gap-6 mt-6 border-t border-gray-200 pt-4'>
  {/* Posts Count */}
  <div>
    <span className='sm:text-xl font-bold text-gray-900'>
      {posts?.length || 0}
    </span>
    <span className='text-xs sm:text-sm text-gray-500 ml-1.5'>Posts</span>
  </div>

  {/* Followers Count */}
  <div>
    <span className='sm:text-xl font-bold text-gray-900'>
      {user?.followers?.length || 0}
    </span>
    <span className='text-xs sm:text-sm text-gray-500 ml-1.5'>Followers</span>
  </div>

  {/* Following Count */}
  <div>
    <span className='sm:text-xl font-bold text-gray-900'>
      {user?.following?.length || 0}
    </span>
    <span className='text-xs sm:text-sm text-gray-500 ml-1.5'>Following</span>
  </div>
</div>


</div>


  </div>
</div>
  )
}

export default UserProfileInfo
