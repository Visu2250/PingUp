// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import {inngest,functions} from './inngest/index.js'
// import {serve} from 'inngest/express'


// const app=express();
// await connectDB();

// app.use(express.json());
// app.use(cors());

// app.get('/',(req,res)=>res.send('Server is running'))
// app.use("/api/inngest", serve({ client: inngest, functions }));


// const PORT=process.env.PORT|| 4000;

// app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))

// // mongodb+srv://Visu2250:Visu1572@cluster2forpingup.sykxavh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2forPingUp





import dotenv from "dotenv";
dotenv.config(); // ✅ first line

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";

import { inngest, functions } from "./api/inngest.js";
import imagekit from "./config/imagekit.js"; // Adjust path if needed
import postRouter from "./routes/postRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
// console.log("ImageKit:", imagekit);



const app = express();
await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/story', storyRouter);
app.use('/api/message', messageRouter);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}, mode: ${process.env.NODE_ENV || "development"}`)
);



