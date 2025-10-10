import { createHmac } from 'crypto';

const INNGEST_SIGNING_KEY = 'sk_test_Kl5qhFcbtMQq6OjZnrzH4mgg4TRSbkX0d5AHOvFpTY'; // Your Inngest signing key
const currentTimestamp = Math.floor(Date.now() / 1000); // Auto-calculates current time in seconds
const payload = JSON.stringify({
  name: "clerk/user.created",
  data: { userId: "test123" },
  ts: currentTimestamp
});

// Generate signature
const signature = createHmac('sha256', INNGEST_SIGNING_KEY)
  .update(payload)
  .digest('base64url');

// Extra checks and logs
console.log('Current Timestamp (seconds):', currentTimestamp);
console.log('Payload:', payload);
console.log('Signature:', signature);
if (!INNGEST_SIGNING_KEY) console.log('Warning: INNGEST_SIGNING_KEY is missing!');
if (signature.length < 10) console.log('Warning: Signature seems too short, check key!');
