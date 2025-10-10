
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Feed from './pages/feed';
import Messages from './pages/messages'
import Connections from './pages/connections';
import Profile from './pages/profile';
import CreatePost from './pages/createpost';
import Discover from './pages/Discover';
import Chatbox from './pages/chatbox';
import {useUser,useAuth} from '@clerk/clerk-react'
import Layout from './pages/layout';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const App = () => {
  const {user}=useUser()
  const {getToken}=useAuth()

  useEffect(()=>{
    if(user){
      getToken().then((token)=>console.log(token))
    }
  },[user])
  return (
    <>
    <Toaster/>
      <Routes>
        
        <Route path='/' element={!user ? <Login />:<Layout/>}>
         
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
