
// import React from 'react'
// import { Route, Routes } from 'react-router-dom';
// import Login from './pages/login';
// import Feed from './pages/feed';
// import Messages from './pages/messages'
// import Connections from './pages/connections';
// import Profile from './pages/profile';
// import CreatePost from './pages/createpost';
// import Discover from './pages/Discover';
// import Chatbox from './pages/chatbox';
// import {useUser,useAuth} from '@clerk/clerk-react'
// import Layout from './pages/layout';
// import { Toaster } from 'react-hot-toast';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUser } from './feature/user/userSlice';

// const App = () => {
//   const {user}=useUser()
//   const {getToken}=useAuth()



// const dispatch=useDispatch()



//   useEffect(()=>{
//     const fetchData=async()=>{
//       if(user){
//         const token=await getToken()
//         dispatch(fetchUser(token))

//       }
//     }
//     fetchData()
   
//   },[user,getToken,dispatch])
//   return (
//     <>
//     <Toaster/>
//       <Routes>
        
//         <Route path='/' element={!user ? <Login />:<Layout/>}>
         
//           <Route index element={<Feed />} />
//           <Route path='messages' element={<Messages />} />
//           <Route path='messages/:userId' element={<Chatbox />} />
//           <Route path='connections' element={<Connections />} />
//           <Route path='discover' element={<Discover />} />
//           <Route path='profile' element={<Profile />} />
//           <Route path='profile/:profileId' element={<Profile />} />
//           <Route path='create-post' element={<CreatePost />} />
//         </Route>
//       </Routes>
//     </>
//   )
// }

// export default App



import React, { useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Feed from './pages/feed';
import Messages from './pages/messages'
import Connections from './pages/connections';
import Profile from './pages/profile';
import CreatePost from './pages/createpost';
import Discover from './pages/Discover';
import Chatbox from './pages/chatbox';

import {useUser,useAuth} from '@clerk/clerk-react' 
import Layout from './pages/layout';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './feature/user/userSlice';
import { fetchConnections } from './feature/connections/connectionsSlice';
import { addMessage } from './feature/messages/messagesSlice';
import Notification from './components/Notification';


 

const App = () => {
 
  const { user, isLoaded } = useUser(); 
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const {pathname}=useLocation();
  const pathnameRef=useRef(pathname)

  // 4. Redux User Fetching Logic
  // Clerk user object उपलब्ध होने के बाद ही Redux data fetch करें
  useEffect(()=>{
    const fetchData=async()=>{
      if(user){
        const token=await getToken()
        dispatch(fetchUser(token))
        dispatch(fetchConnections(token))
      }
    }
    fetchData()
  },[user,getToken,dispatch])

  useEffect(()=>{
    pathnameRef.current=pathname
  },[pathname])

  useEffect(()=>{
    if(user){
      const evenSource=new EventSource(import.meta.env.VITE_BASEURL +'/api/message/'+ user.id);

      evenSource.onmessage=(event)=>{
        const message=JSON.parse(event.data)
        if(pathnameRef.current===('/message/'+message.from_user_id._id)){
          dispatch(addMessage(message))
        }else{
          toast.custom(()=>(
            <Notification t={t} message={message}/>
          ),{position: "bottom-right"})
        }
      }
      return()=>{
        evenSource.close();
      }
    }
  },[user,dispatch])
  
  // 5. Routing Logic (अब लोडिंग चेक सीधे Route element के अंदर है)
  return (
    <>
      <Toaster/>
      <Routes>
        {/*
          Blank Screen Fix: हमने isLoaded चेक को Route element के अंदर मूव कर दिया है।
          यह सुनिश्चित करता है कि React Router हमेशा शुरू हो और लोडिंग के दौरान भी कुछ रेंडर करे।
        */}
        <Route 
          path='/' 
          element={
            !isLoaded ? (
              <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-xl text-gray-700 font-bold p-4 shadow-lg rounded-lg bg-white">
                    Loading Application...
                </p>
              </div>
            ) : (
              user ? <Layout /> : <Login />
            )
          }
        >
          
          <Route index element={<Feed />} />
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:userId' element={<Chatbox />} />
          <Route path='connections' element={<Connections />} />
          <Route path='discover' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App






