export interface PostVisitorRequest {
  ip: string;
  visitedAt: Date;
}

export interface ApiResponse {
  ip: string;
  timestamp: string;
}
