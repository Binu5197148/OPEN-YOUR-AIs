import { createHmac } from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  if (!password || password !== adminPassword) {
    return res.status(401).json({ ok: false });
  }

  const secret = process.env.SESSION_SECRET || adminPassword;
  const token = createHmac('sha256', secret).update('admin_session').digest('hex');

  return res.status(200).json({ ok: true, token });
}
