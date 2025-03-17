// src/pages/api/get-ip.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString();

  console.log(`[${currentTime}] [Access Attempt] Client attempted to access API endpoint`);

  const forwarded = req.headers['x-forwarded-for'] as string; // Get client IP behind a proxy
  const clientIp = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  
  console.log(`[${currentTime}] [Access Record] Client IP: ${clientIp}`); // Print IP in console
  
  res.status(200).json({ ip: clientIp, timestamp: currentTime });
}