import type { NextApiRequest, NextApiResponse } from 'next';
import { getNavItems } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const result = await getNavItems();
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
