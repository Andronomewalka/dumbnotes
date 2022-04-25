import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { initMiddleware } from 'utils/middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
    origin: process.env.NEXT_PUBLIC_ORIGIN_ADMIN,
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  try {
    if (req.method === 'POST') {
      if (req.body.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token', success: false });
      }
      const postPath = req.body.post as string;
      if (!postPath) {
        return res.status(400).json({ message: 'No post provided', success: false });
      }
      await res.unstable_revalidate(`/${postPath}`);
      res.status(200).json({ message: `Post ${postPath} revalidated`, success: true });
    } else {
      res.status(405).json({ message: 'Wrong method', success: false });
    }
  } catch (error: any) {
    res.status(500).json({ message: error + '', success: false });
  }
}
