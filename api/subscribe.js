export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const response = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      audience_id: 'YOUR_AUDIENCE_ID'
    })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed' });
  }
}
