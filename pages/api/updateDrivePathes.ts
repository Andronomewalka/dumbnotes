import type { NextApiRequest, NextApiResponse } from 'next';
import { loadDrivePathes } from 'fetch-cache';

// update drivePathes cache for the new driveItems to get corresponding new id by their path
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await loadDrivePathes();
    res.status(200).json(true);
  } else {
    res.status(405).json(false);
  }
}
