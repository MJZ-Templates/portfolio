import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  const timeZoneOffsetInMinutes = now.getTimezoneOffset();
  const timeZoneOffsetInMillis = timeZoneOffsetInMinutes * 60 * 1000;
  const localISOTime = new Date(now.getTime() - timeZoneOffsetInMillis).toISOString().slice(0, -1);
  const formattedTimeStamp = `${localISOTime}${formatTimeZoneOffset(timeZoneOffsetInMinutes)}`;

  const forwarded = req.headers["x-forwarded-for"] as string;
  const clientIp = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;

  res.status(200).json({ ip: clientIp, timestamp: formattedTimeStamp });
}

function formatTimeZoneOffset(minutes: any) {
  const absOffset = Math.abs(minutes);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const mins = String(absOffset % 60).padStart(2, '0');
  const sign = minutes <= 0 ? '+' : '-';
  return `${sign}${hours}:${mins}`;
}
