export interface JwtPayloadResponse {
  access_token: string;
}

export interface JWTPayload {
  sub: number;
  email: string;
  name: string;
}
