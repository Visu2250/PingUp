// import React, { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { Menu, X } from 'lucide-react'
// import {dummyUserData} from '../assets/assets'
// import Loading from '../components/Loading'
// import { useSelector } from 'react-redux'

// const Layout = () => {
//   const user=dummyUserData
//   // const user=useSelector((state)=>state.user.value)
//   const[sidebarOpen,setSidebarOpen]=useState(false)
//   return user ? (
//   <div className='w-full flex h-screen '>
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      
//       <div className='flex-1 bg-slate-50'>
//         <Outlet/>
//       </div>
//       {
//         sidebarOpen ?
//         <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=> setSidebarOpen(false)}/>
//         :
//         <Menu className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden" onClick={()=> setSidebarOpen(true)}/>
//       }
//     </div>
//   ): (
//    <Loading/>
//   )
// }

// export default Layout



import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
// dummyUserData की अब ज़रूरत नहीं है
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'

const Layout = () => {
  // Redux से user डेटा फ़ेच करें। App.jsx सुनिश्चित करता है कि यह Component तभी रेंडर हो जब user लॉग इन हो।
  const user = useSelector((state) => state.user?.value)
  
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // अब कोई लोडिंग चेक नहीं, हम सीधा UI रेंडर करते हैं
  return (
    <div className='w-full flex h-screen '>
      {/* Sidebar को user data Redux से मिलता है */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        
      <div className='flex-1 bg-slate-50'>
        {/* यह Child Routes (Feed, Profile, etc.) को रेंडर करेगा */}
        <Outlet/> 
      </div>
      {/* Mobile Menu Buttons */}
      {
        sidebarOpen ?
        <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=> setSidebarOpen(false)}/>
        :
        <Menu className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden" onClick={()=> setSidebarOpen(true)}/>
      }
    </div>
  )
}

export default Layout

