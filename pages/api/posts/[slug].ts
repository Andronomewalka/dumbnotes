import type { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug: string };
  if (req.method === 'GET') {
    const result = await getPost(slug);
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
