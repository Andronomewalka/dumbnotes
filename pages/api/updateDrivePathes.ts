import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { initMiddleware, loadDrivePathes } from 'backend';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
    origin: 'http://localhost:4001',
  })
);

// update drivePathes cache for the new driveItems to get corresponding new id by their path
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method === 'POST') {
    await loadDrivePathes();
    res.status(200).json(true);
  } else {
    res.status(405).json(false);
  }
}
