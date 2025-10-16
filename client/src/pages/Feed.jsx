// import React, { useEffect, useState } from "react";
// import { assets, dummyPostsData } from "../assets/assets";
// import Loading from "../components/Loading";
// import Storiesbar from "../components/Storiesbar";
// import PostCard from "../components/PostCard";
// import RecentMessages from "../components/RecentMessages";
// import toast from "react-hot-toast";
// import { useAuth } from "@clerk/clerk-react";
// import api from "../api/axios";

// const Feed = () => {
//   const [feeds, setFeeds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { isLoaded, getToken } = useAuth();

//   const fetchFeeds = async () => {
//   //   try {
//   //     if (!isLoaded) return; 
//   //     setLoading(true);
//   //     const { data } = await api.get("/api/post/feed", {
//   //       headers: { Authorization: `Bearer ${await getToken()}` },
//   //     });

//   //     if (data.success) {
//   //       setFeeds(data.posts);
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.message);
//   //   }
//   //   setFeeds(dummyPostsData);
//   //   setLoading(false);
//   // };


// try {
//   if (!isLoaded) return;
//   setLoading(true);

//   const token = await getToken();
//   if (!token) {
//     console.warn("No token found");
//     setFeeds(dummyPostsData);
//     return;
//   }

//   const { data } = await api.get("/api/post/feed", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (data.success) {
//     setFeeds(data.posts);
//   } else {
//     toast.error(data.message);
//     setFeeds(dummyPostsData);
//   }
// } catch (error) {
//   toast.error(error.message);
//   setFeeds(dummyPostsData);
// } finally {
//   setLoading(false);
// };

//   }









//   useEffect(() => {
//     fetchFeeds();
//   }, [isLoaded]);

//   return !loading ? (
//     <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:px-5 flex items-start justify-center xl:gap-8">
//       {/* Stories and post list */}
//       <div>
//         <Storiesbar />
//         <div className="p-4 space-y-2">
//           {feeds.map((post) => (
//             <PostCard key={post._id} post={post} />
//           ))}
//         </div>
//       </div>

//       {/* right Sidebar */}
//       <div className="max-xl:hidden sticky top-0">
//         <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
//           <h3 className="text-slate-800 font-semibold">Sponsored</h3>
//           <img
//             src={assets.sponsored_img}
//             className="w-75 h-50 rounded-md"
//             alt=""
//           />
//           <p className="text-slate-600">Email marketing</p>
//           <p className="text-slate-400">
//             Supercharge your marketing with a powerful, easy-to-use platform
//             built for results.
//           </p>
//         </div>
//         <RecentMessages />
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default Feed;

import React, { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import Loading from "../components/Loading";
import Storiesbar from "../components/Storiesbar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios.js";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded, getToken } = useAuth();

  const fetchFeeds = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      console.log("Token:", token);

      // Agar token nahi hai, dummy data use karo
      if (!token) {
        console.warn("No token found, using dummy data");
        setFeeds(dummyPostsData);
        return;
      }

      const { data } = await api.get("/api/post/feed", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("API data:", data);

      if (data.success) {
        setFeeds(data.posts || []);
      } else {
        toast.error(data.message || "Failed to fetch posts");
        setFeeds(dummyPostsData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Something went wrong");
      setFeeds(dummyPostsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchFeeds();
    }
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return <Loading />;
  }
  

  return (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:px-5 flex items-start justify-center xl:gap-8">
      {/* Main feed */}
      <div>
        <Storiesbar />
        <div className="p-4 space-y-2">
          {feeds.length > 0 ? (
            feeds.map((post, index) => (
              <PostCard key={post._id || index} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-75 h-50 rounded-md"
            alt="Sponsored"
          />
          <p className="text-slate-600">Email marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>
        <RecentMessages />
      </div>
    </div>
  );
};

export default Feed;
