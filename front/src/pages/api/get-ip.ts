import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString();

  const forwarded = req.headers['x-forwarded-for'] as string; 
  const clientIp = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  
  res.status(200).json({ ip: clientIp, timestamp: currentTime });
}