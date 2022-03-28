import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { initMiddleware } from 'utils/middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: 'http://localhost:4001',
  })
);

// update drivePathes cache for the new driveItems to get corresponding new id by their path
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method === 'GET') {
    if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
      return res.status(401).json({ message: 'Invalid token', success: false });
    }
    const postPath = req.query.post as string;
    if (!postPath) {
      return res.status(400).json({ message: 'No post provided', success: false });
    }
    await res.unstable_revalidate(`/${postPath}`);
    res.status(200).json({ message: `Post ${postPath} revalidated`, success: true });
  } else {
    res.status(405).json({ message: 'Wrong method', success: false });
  }
}
