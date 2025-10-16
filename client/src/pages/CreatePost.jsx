// import React, { useState } from 'react'
// import { dummyUserData } from '../assets/assets'
// import { X } from 'lucide-react'
// import { Image } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const CreatePost = () => {
//     const navigate= useNavigate()
//   const [content, setContent]=useState('')
//   const [images, setImages]=useState([])
//   const[loading, setLoading]=useState(false)
  

// //   const user=dummyUserData;
//   const user=useSelector((state)=>state.user.value)

// const handleSubmit=async () => {
//     if(!images.length && !content){
//         return toast.error('Please add at least one image or text')

//     }
//     setLoading(true)

//     const postType=images.length && content ? 'text_with_image': images.length?'image':'text'

//     try{
//         const formData=new FormData();
//         FormData.append('content', content)
//         FormData.append('post_type', postType)
//         images.map((image)=>{
//             formData.append('images',image)
//         })
//       const { data } = await api.post('/api/post/add', formData, {
//     headers: {
//         Authorization: `Bearer ${await getToken()}`
//     }
// })
// if(data.success){
//     navigate('/')
// }else{
//     console.log(data.message)
//     throw new Error(data.message)
// }
//     }catch(error){
//         console.log(error.message)
//         throw new Error(error.message)
//     }
//     setLoading(false)
// }

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
//       <div className='max-w-6xl mx-auto p-6'>
//         {/* Title  */}
//         <div className='mb-8'>
//           <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
//             <p className='text-slate-600'>Share your thoughts with the world</p>
         
//         </div>
//         {/* Form  */}
//         <div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>
//   {/* Header */}
//   <div className='flex items-center gap-3'>
//     <img src={user.profile_picture} alt="" className='w-12 h-12 rounded-full shadow'/>
//     <div>
//       <h2 className='font-semibold'>{user.full_name}</h2>
//       <p className='text-sm text-gray-500'>@{user.username}</p>
//     </div>
//   </div>

// {/* TextArea  */}
//     <textarea
//   className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
//   placeholder="What's happening?"
//   onChange={(e)=>setContent(e.target.value)}
//   value={content}
// />

//     {/* Images  */}
//     {
//       images.length>0 && <div className='flex flex-wrap gap-2 mt-4'>
//         {
//           images.map((image,i)=>(
//             <div key={i} className='relative group'>
//               <img src={URL.createObjectURL(image)} alt="" className='h-20 rounded-md'/>
//               <div onClick={() => setImages(images.filter((_, index) => index != i))} className='absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'>
//                 <X className='w-6 h-6 text-white'/>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     }


//       {/* Bottom Bar  */}

//     <div className='flex items-center justify-between pt-3 border-t border-gray-300'>
//       <label htmlFor="images" className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'>
//   <Image className='size-6'/>
// </label>

// <input type="file" id="images" accept='image/*' hidden multiple onChange={(e)=>setImages([...images, ...e.target.files])}/>
// <button
//   disabled={loading}
//   onClick={() => 
//     toast.promise(
//       handleSubmit(),  // ✅ Now it returns a promise
//       {
//         loading: 'Uploading...',
//         success: 'Post Added',
//         error: 'Post Not Added',
//       }
//     )
//   }
//   className='text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer'
// >
//   Publish Post
// </button>

//     </div>








//         </div>
  
//       </div>
//     </div>
//   )
// }

// export default CreatePost



import React, { useState } from "react";
import { X, Image } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js"; // ✅ Axios instance import

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Redux se user data safe tarike se lena
  const user = useSelector((state) => state.user?.value);
  const isUserLoading = !user;

  // ✅ Placeholder data (jab tak user load ho raha ho)
  const userProfilePic =
    user?.profile_picture ||
    "https://placehold.co/48x48/f3f4f6/a3a3a3?text=N/A";
  const userName = user?.full_name || "Loading User...";
  const userUsername = user?.username || "loading";

  const { getToken } = useAuth();

  // ✅ Handle Submit Function
  const handleSubmit = async () => {
    if (!images.length && !content.trim()) {
      return toast.error("Please add at least one image or text");
    }

    setLoading(true);
    const postType =
      images.length && content
        ? "text_with_image"
        : images.length
        ? "image"
        : "text";

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("post_type", postType);
      images.forEach((image) => formData.append("images", image));

      const { data } = await api.post("/api/post/add", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        navigate("/");
        return "Post Added Successfully!";
      } else {
        throw new Error(data.message || "Post Not Added");
      }
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Post
          </h1>
          <p className="text-slate-600">Share your thoughts with the world</p>
        </div>

        {/* Form */}
        <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={userProfilePic}
              alt="profile"
              className="w-12 h-12 rounded-full shadow"
            />
            <div>
              <h2 className="font-semibold">{userName}</h2>
              <p className="text-sm text-gray-500">@{userUsername}</p>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            className="w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Images Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="h-20 rounded-md"
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <Image className="size-6" />
            </label>

            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) =>
                setImages([...images, ...Array.from(e.target.files)])
              }
            />

            <button
              disabled={loading || isUserLoading || !content.trim()}
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: (msg) => msg,
                  error: (err) => err.message,
                })
              }
              className={`text-sm font-medium px-8 py-2 rounded-md transition cursor-pointer ${
                loading || isUserLoading || !content.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white"
              }`}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;


