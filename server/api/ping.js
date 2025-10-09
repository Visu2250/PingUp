// ping.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Ping received:', req.body);
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
