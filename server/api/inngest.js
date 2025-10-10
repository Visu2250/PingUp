import { Inngest } from "inngest";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config(); // Must be first

const signingKey = process.env.INNGEST_SIGNING_KEY?.trim();

if (!signingKey) console.error("⚠️ Inngest signing key is not set!");

// Create Inngest client
export const inngest = new Inngest({
  id: "pingup-app",
  signingKey,
});

// Your Inngest functions…
export const functions = [];
