// import { Badge, BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
// import moment from 'moment'
// import React ,{useState} from 'react'
// import { dummyUserData } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const PostCard = ({post}) => {

//     const postWithHashtags=post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')

//     const [likes,setLikes]=useState(post.likes_count)
//     const currentUser=dummyUserData
//     //  const user=useSelector((state)=>state.user.value)

//     const handleLike= async()=>{

//     }

//     const navigate= useNavigate();


//   return (
//     <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
//         {/* Userinfo  */}
//         <div onClick={()=> navigate('/profile/'+ post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>
//             <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
//             <div>
//                 <div className='flex items-center space-x-1'>
//                     <span>{post.user.full_name}</span>
//                     <BadgeCheck className='w-4 h-4 text-blue-500'/>
//                 </div>
//                 <div className='text-gray-500 text-sm' >@{post.user.username} • { moment(post.createdAt).fromNow()}</div>
//             </div>
//         </div>
//         {/* Content  */}

//        {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{__html: postWithHashtags}}/>}

//     {/* Images  */}
//     <div className='grid grid-cols-2 gap-2'>
//         {post.image_urls.map((img,index)=>(
//             <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length=== 1 && 'col-span-2 h-auto'}`} alt=''/>
//         ))}

//     </div>
//         {/* Actions  */}
//         <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
//     <div className='flex items-center gap-1'>
        
//         <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike}/>
//         <span>{likes.length}</span>
//     </div>
//     <div className='flex items-center gap-1'>
        
//        <MessageCircle className='w-4 h-4'/>
//         <span>{12}</span>
//     </div>

//     <div className='flex items-center gap-1'>   
//        <Share2 className='w-4 h-4'/>
//         <span>{7}</span>
//     </div>
// </div>

//     </div>
//   )
// }

// export default PostCard


import { Badge, BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React ,{useState} from 'react'
import { dummyUserData } from '../assets/assets' // अगर आप इसे हटाना चाहें तो हटा सकते हैं
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const PostCard = ({post}) => {

    // Redux से सुरक्षित रूप से current user डेटा fetch करें
    const currentUser = useSelector((state) => state.user?.value); 

    // Optional: अगर आपका user object सीधे state.user पर है:
    // const currentUser = useSelector((state) => state.user);
    
    // यह चेक करें कि current user का data लोड हुआ है या नहीं
    const isUserLoggedIn = Boolean(currentUser && currentUser._id);


    // Hashtags को highlight करने के लिए
    const postWithHashtags=post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')

    // Likes state को initialize करें
    const [likes,setLikes]=useState(post.likes_count)
    // const {getToken}=useAuth()
    
    const handleLike= async()=>{
        try{
            const {data}=await api.post(`/api/post/like`, {postId:post._id}, {headers:{Authorization:`Bearer ${await getToken()}`}})
            if(data.success){
                toast.success(data.message)
                setLikes(prev=>{
                    if(prev.includes(currentUser._id)){
                        return prev.filter(id=>id!== currentUser._id)
                    }else{
                        return[...prev, currentUser._id]
                    }
                })
            }else{
                toast(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const navigate= useNavigate();

    // Check करें कि post object और उसके अंदर user object मौजूद हैं
    if (!post || !post.user) return null;


    return (
        <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
            {/* Userinfo  */}
            <div onClick={()=> navigate('/profile/'+ post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>
                <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
                <div>
                    <div className='flex items-center space-x-1'>
                        <span>{post.user.full_name}</span>
                        <BadgeCheck className='w-4 h-4 text-blue-500'/>
                    </div>
                    <div className='text-gray-500 text-sm' >@{post.user.username} • { moment(post.createdAt).fromNow()}</div>
                </div>
            </div>
            {/* Content  */}

            {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{__html: postWithHashtags}}/>}

        {/* Images  */}
        <div className='grid grid-cols-2 gap-2'>
            {post.image_urls.map((img,index)=>(
                <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length=== 1 && 'col-span-2 h-auto'}`} alt=''/>
            ))}

        </div>
            {/* Actions  */}
            <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
        <div className='flex items-center gap-1'>
            
            <Heart 
                // likes array में user._id की जाँच करने से पहले सुनिश्चित करें कि currentUser मौजूद है।
                className={`w-4 h-4 cursor-pointer ${isUserLoggedIn && likes.includes(currentUser._id) ? 'text-red-500 fill-red-500' : ''}`} 
                onClick={handleLike}
            />
            <span>{likes.length}</span>
        </div>
        <div className='flex items-center gap-1'>
            
            <MessageCircle className='w-4 h-4'/>
            <span>{12}</span>
        </div>

        <div className='flex items-center gap-1'>  
            <Share2 className='w-4 h-4'/>
            <span>{7}</span>
        </div>
    </div>

        </div>
    )
}

export default PostCard
