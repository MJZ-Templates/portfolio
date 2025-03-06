// src/pages/api/get-ip.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = new Date().toISOString(); // 현재 시각 가져오기 (ISO 형식으로)

  console.log(`[${currentTime}] [접속 시도] 클라이언트에서 API 엔드포인트에 접근 시도`);

  const forwarded = req.headers['x-forwarded-for'] as string; // 프록시 뒤 클라이언트 IP 가져오기
  const clientIp = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  
  console.log(`[${currentTime}] [접속 기록] 클라이언트 IP: ${clientIp}`); // 콘솔에 IP 출력
  
  res.status(200).json({ ip: clientIp });
}
