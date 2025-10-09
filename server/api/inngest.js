// 📄 server/api/inngest.js

import { serve } from "inngest/next";
// ऊपर की फ़ाइल से inngest client और functions import करो
import { inngest, functions } from "../inngest/index.js"; 

// 🔹 Vercel/Next.js के लिए functions को expose करने के लिए serve() का उपयोग करें
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});

// इससे Vercel पर https://your-app.vercel.app/api/inngest endpoint बन जाएगा

