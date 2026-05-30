export default async function handler(req, res) {
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  const userId = 'ram';

  async function redisCmd(command) {
    const r = await fetch(`${REDIS_URL}/${command}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    return r.json();
  }

  if (req.method === 'GET') {
    const { key } = req.query;
    if (!key) return res.status(400).json({ error: 'Missing key' });

    try {
      const result = await redisCmd(`get/${userId}:${key}`);
      const value = result.result ? JSON.parse(result.result) : null;
      return res.status(200).json({ key, value });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
  }

  if (req.method === 'POST') {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ error: 'Missing key or value' });
    }

    try {
      await redisCmd(`set/${userId}:${key}/${encodeURIComponent(JSON.stringify(value))}`);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
