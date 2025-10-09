// server/testEvent.js
import { inngest } from "./client.js";

async function sendTestEvent() {
  try {
    await inngest.send({
      name: "demo/hello", // aapka function event name
      data: {},           // agar koi data bhejna ho
    });
    console.log("✅ Event sent successfully!");
  } catch (err) {
    console.error("❌ Error sending event:", err);
  }
}

sendTestEvent();
