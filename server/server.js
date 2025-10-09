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





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

dotenv.config();

const app = express();

// Connect MongoDB
await connectDB();

app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => res.send("Server is running"));

// Select signing key based on environment
const signingKey =
  process.env.NODE_ENV === "production"
    ? process.env.INNGEST_SIGNING_KEY_PROD?.trim()
    : process.env.INNGEST_SIGNING_KEY_DEV?.trim();

if (!signingKey) {
  console.warn("⚠️ Inngest signing key not set!");
}

// Inngest endpoint
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
    signingKey,
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}, mode: ${process.env.NODE_ENV || "development"}`
  )
);
