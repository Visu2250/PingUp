// import React, { useState } from 'react'
// import { dummyUserData } from '../assets/assets'
// import { Pencil } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateUser } from '../feature/user/userSlice'
// import toast from 'react-hot-toast'
// import { useAuth } from '@clerk/clerk-react'

// const ProfileModel = ({setShowEdit}) => {
//   const  dispatch=useDispatch();
//   const {getToken}=useAuth()
//     // const user=dummyUserData
//      const user=useSelector((state)=>state.user?.value)
//     const [editForm, setEditForm]=useState({
//         username: user.username, 
//         bio: user.bio,
//         location: user.location,
//         profile_picture: null,
//         cover_photo: null,
//         full_name: user.full_name,
//     })

//     const handleSaveProfile=async (e) => {
//         e.preventDefault();
//         try{
//             const userData=new FormData();
//             const {full_name, username, bio, location, profile_picture, cover_photo}=editForm

//             userData.append('username', username);
//             userData.append('bio', bio);
//             userData.append('location', location);
//             userData.append('full_name', full_name);
//             profile_picture && userData.append('profile',profile_picture)
//             cover_photo && userData.append('cover', cover_photo)

            

//             const token= await getToken()
//           dispatch(updateUser({userData,token}))
//         }catch(error){
//             toast.error(error.message)
//         }
        
//     }


//   return (
//     <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
//   <div className='max-w-2xl sm:py-6 mx-auto'>
//     <div className='bg-white rounded-lg shadow p-6'>
//       <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>
//       <form className='space-y-4' onSubmit={e=>toast.promise(handleSaveProfile(e), {loading: 'Saving...'})}>
//         {/* Profile Picture */}
//         <div className='flex flex-col items-start gap-3'>
//           <label htmlFor="profile_picture" className='block text-sm font-medium text-gray-700 mb-1'>
//             Profile Picture
//             <input hidden type="file" accept='image/*' id='profile_picture' className='w-full p-3 border border-gray-200 rounded-lg'
//             onChange={(e)=>setEditForm({...editForm, profile_picture: e.target.files[0]})}/>
//             <div className='group/profile relative'>
//             <img src={editForm.profile_picture? URL.createObjectURL(editForm.profile_picture):user.profile_picture} alt="" className='w-24 h-24 rounded-full object-cover mt-2' />

//                 <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center'>
//                     <Pencil className='w-5 h-5 text-white'/>
//                 </div>

//             </div>
//           </label>
//         </div>
//         {/* Cover Photo  */}
//         <div className='flex flex-col items-start gap-3'>
//             <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
//                 Cover Photo
//                 <input hidden type="file" accept='image/*' id='cover_photo' className='w-full p-3 border border-gray-200 rounded-lg'
//             onChange={(e)=>setEditForm({...editForm, cover_photo: e.target.files[0]})}/>
//             <div className='group/cover relative'>
//                 <img src={editForm.cover_photo? URL.createObjectURL(editForm.cover_photo):user.cover_photo} alt="" className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2' />

//                 <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center'>
//                     <Pencil  className='w-5 h-5 text-white'/>
//                 </div>



//             </div>
//             </label>

//         </div>

//         <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Name
//   </label>
//     <input 
//         type="text" 
//         className='w-full p-3 border border-gray-200 rounded-lg' 
//         placeholder='Please enter your full name' 
//         onChange={(e)=>setEditForm({...editForm,    full_name: e.target.value})} 
//             value={editForm.full_name}
//         />
//         </div>

//         <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//    Username
//   </label>
//     <input 
//         type="text" 
//         className='w-full p-3 border border-gray-200 rounded-lg' 
//         placeholder='Please enter a  username' 
//         onChange={(e)=>setEditForm({...editForm,    username: e.target.value})} 
//             value={editForm.username}
//         />
//         </div>



//         <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//    Bio
//   </label>
//     <textarea 
//         rows={3}
//         className='w-full p-3 border border-gray-200 rounded-lg' 
//         placeholder='Please enter a  username' 
//         onChange={(e)=>setEditForm({...editForm,    bio: e.target.value})} 
//             value={editForm.bio}
//         />
//         </div>


//         <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//    Location
//   </label>
//     <textarea 
//         rows={3}
//         className='w-full p-3 border border-gray-200 rounded-lg' 
//         placeholder='Please enter a  username' 
//         onChange={(e)=>setEditForm({...editForm,    location: e.target.value})} 
//             value={editForm.location}
//         />
//         </div>

//         <div className='flex justify-end space-x-3 pt-6'>
//   <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>

//   <button type='submit' className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer'>Save Changes</button>
// </div>
    
//       </form>
//     </div>
//   </div>
// </div>
//   )
// }

// export default ProfileModel






// // import React, { useState, useEffect } from 'react'
// // import { Pencil, X } from 'lucide-react'
// // import { useSelector } from 'react-redux'

// // const ProfileModel = ({ setShowEdit }) => {
// //     // 1. Redux से user डेटा सुरक्षित रूप से प्राप्त करें
// //     const user = useSelector((state) => state.user?.value);

// //     // 2. Form state को खाली (default) मानों से इनिशियलाइज़ करें
// //     const [editForm, setEditForm] = useState({
// //         username: '',
// //         bio: '',
// //         location: '',
// //         profile_picture: null, // File object
// //         cover_photo: null,     // File object
// //         full_name: '',
// //     });
// //     const [isSaving, setIsSaving] = useState(false);

// //     // 3. useEffect का उपयोग करके user डेटा लोड होने पर फॉर्म को पॉपुलेट करें
// //     useEffect(() => {
// //         if (user) {
// //             setEditForm({
// //                 username: user.username || '',
// //                 bio: user.bio || '',
// //                 location: user.location || '',
// //                 // फ़ाइल इनपुट के लिए null, क्योंकि हम फ़ाइल को प्री-लोड नहीं करते
// //                 profile_picture: null, 
// //                 cover_photo: null,
// //                 full_name: user.full_name || '',
// //             });
// //         }
// //     }, [user]); // जब user डेटा बदलता है, यह इफ़ेक्ट फिर से चलता है

// //     const handleSaveProfile = async (e) => {
// //         e.preventDefault();
// //         // Saving logic here
// //         // ...
// //         setIsSaving(true);
// //         // Assuming API call logic...
// //         // setIsSaving(false);
// //         // setShowEdit(false);
// //     }
    
// //     // 4. यदि user डेटा अभी भी लोड नहीं हुआ है, तो मोडल को रेंडर न करें (या एक साधारण लोडिंग स्पिनर दिखाएँ)
// //     if (!user) {
// //         return null;
// //     }

// //     // Function to get the correct profile image URL
// //     const getProfilePicUrl = () => {
// //         if (editForm.profile_picture) {
// //             return URL.createObjectURL(editForm.profile_picture);
// //         }
// //         // Fallback: If user data is available, use the stored URL.
// //         return user.profile_picture || 'https://placehold.co/96x96/e0e0e0/000000?text=P';
// //     };

// //     // Function to get the correct cover photo URL
// //     const getCoverPhotoUrl = () => {
// //         if (editForm.cover_photo) {
// //             return URL.createObjectURL(editForm.cover_photo);
// //         }
// //         // Fallback: If user data is available, use the stored URL.
// //         return user.cover_photo || 'https://placehold.co/320x160/b0b0b0/ffffff?text=Cover';
// //     };


// //     return (
// //         <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
// //             <div className='max-w-2xl sm:py-6 mx-auto'>
// //                 <div className='bg-white rounded-lg shadow p-6'>
// //                     <div className='flex justify-between items-center mb-6'>
// //                         <h1 className='text-2xl font-bold text-gray-900'>Edit Profile</h1>
// //                         <X className='w-6 h-6 text-gray-500 hover:text-gray-900 transition cursor-pointer' onClick={() => setShowEdit(false)} />
// //                     </div>
                    
// //                     <form className='space-y-4' onSubmit={handleSaveProfile}>
// //                         {/* Profile Picture */}
// //                         <div className='flex flex-col items-start gap-3'>
// //                             <label htmlFor="profile_picture" className='block text-sm font-medium text-gray-700 mb-1'>
// //                                 Profile Picture
// //                                 <input hidden type="file" accept='image/*' id='profile_picture'
// //                                     onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })} />
// //                                 <div className='group/profile relative'>
// //                                     <img 
// //                                         src={getProfilePicUrl()} 
// //                                         alt="Profile Preview" 
// //                                         className='w-24 h-24 rounded-full object-cover mt-2 border-4 border-white shadow-md' 
// //                                     />
// //                                     <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center'>
// //                                         <Pencil className='w-5 h-5 text-white' />
// //                                     </div>
// //                                 </div>
// //                             </label>
// //                         </div>

// //                         {/* Cover Photo  */}
// //                         <div className='flex flex-col items-start gap-3'>
// //                             <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
// //                                 Cover Photo
// //                                 <input hidden type="file" accept='image/*' id='cover_photo'
// //                                     onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })} />
// //                                 <div className='group/cover relative'>
// //                                     <img 
// //                                         src={getCoverPhotoUrl()} 
// //                                         alt="Cover Preview" 
// //                                         className='w-full h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2' 
// //                                     />
// //                                     <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center'>
// //                                         <Pencil className='w-5 h-5 text-white' />
// //                                     </div>
// //                                 </div>
// //                             </label>
// //                         </div>

// //                         {/* Name Input */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Name
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 className='w-full p-3 border border-gray-200 rounded-lg'
// //                                 placeholder='Please enter your full name'
// //                                 onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
// //                                 value={editForm.full_name}
// //                             />
// //                         </div>

// //                         {/* Username Input */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Username
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 className='w-full p-3 border border-gray-200 rounded-lg'
// //                                 placeholder='Please enter a username'
// //                                 onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
// //                                 value={editForm.username}
// //                             />
// //                         </div>

// //                         {/* Bio Textarea */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Bio
// //                             </label>
// //                             <textarea
// //                                 rows={3}
// //                                 className='w-full p-3 border border-gray-200 rounded-lg resize-none'
// //                                 placeholder='Tell us a little about yourself'
// //                                 onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
// //                                 value={editForm.bio}
// //                             />
// //                         </div>

// //                         {/* Location Textarea */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Location
// //                             </label>
// //                             <input 
// //                                 type='text'
// //                                 className='w-full p-3 border border-gray-200 rounded-lg'
// //                                 placeholder='Where are you located?'
// //                                 onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
// //                                 value={editForm.location}
// //                             />
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className='flex justify-end space-x-3 pt-6'>
// //                             <button type='button' onClick={() => setShowEdit(false)} className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>
// //                                 Cancel
// //                             </button>
// //                             <button 
// //                                 type='submit' 
// //                                 disabled={isSaving}
// //                                 className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
// //                             >
// //                                 {isSaving ? 'Saving...' : 'Save Changes'}
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default ProfileModel


import React, { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../feature/user/userSlice'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

const ProfileModel = ({ setShowEdit }) => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const user = useSelector((state) => state.user?.value);

  // 🛑 अगर user data अभी नहीं आया है, तो कुछ मत दिखाओ
  if (!user) return null;

  const [editForm, setEditForm] = useState({
    username: user.username || '',
    bio: user.bio || '',
    location: user.location || '',
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name || '',
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      const { full_name, username, bio, location, profile_picture, cover_photo } = editForm;

      userData.append('username', username);
      userData.append('bio', bio);
      userData.append('location', location);
      userData.append('full_name', full_name);
      profile_picture && userData.append('profile', profile_picture);
      cover_photo && userData.append('cover', cover_photo);

      const token = await getToken();
       dispatch(updateUser({ userData, token }));
      toast.success('Profile updated!');
      setShowEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
      <div className='max-w-2xl sm:py-6 mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>

          <form className='space-y-4' onSubmit={handleSaveProfile}>
            {/* Profile Picture */}
            <div className='flex flex-col items-start gap-3'>
              <label htmlFor="profile_picture" className='block text-sm font-medium text-gray-700 mb-1'>
                Profile Picture
                <input hidden type="file" accept='image/*' id='profile_picture'
                  onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })} />
                <div className='group/profile relative'>
                  <img
                    src={editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture}
                    alt=""
                    className='w-24 h-24 rounded-full object-cover mt-2'
                  />
                  <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center'>
                    <Pencil className='w-5 h-5 text-white' />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div className='flex flex-col items-start gap-3'>
              <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
                Cover Photo
                <input hidden type="file" accept='image/*' id='cover_photo'
                  onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })} />
                <div className='group/cover relative'>
                  <img
                    src={editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo}
                    alt=""
                    className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2'
                  />
                  <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center'>
                    <Pencil className='w-5 h-5 text-white' />
                  </div>
                </div>
              </label>
            </div>

            {/* Other Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className='w-full p-3 border border-gray-200 rounded-lg'
                value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" className='w-full p-3 border border-gray-200 rounded-lg'
                value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea rows={3} className='w-full p-3 border border-gray-200 rounded-lg'
                value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" className='w-full p-3 border border-gray-200 rounded-lg'
                value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
            </div>

            <div className='flex justify-end space-x-3 pt-6'>
              <button type='button' onClick={() => setShowEdit(false)}
                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
              <button type='submit'
                className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer'>
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
