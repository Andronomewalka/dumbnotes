import type { NextApiRequest, NextApiResponse } from 'next';
import { getDriveItem } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query || !req.query.id) {
    return res.status(400).json({});
  } else if (req.method === 'GET') {
    const result = await getDriveItem(req.query.id + '');
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
