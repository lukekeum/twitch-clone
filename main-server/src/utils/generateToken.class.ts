import { sign } from 'jsonwebtoken';

export default class GenerateToken {
  static generateAccessToken(payload: TokenPayload) {
    return sign(payload, process.env.ACCESS_JWT_SECRET, {
      expiresIn: '15m',
      subject: 'access_token',
      issuer: 'twitch.lukekeum.me',
    });
  }

  static generateRefreshToken(payload: TokenPayload) {
    return sign(payload, process.env.REFRESH_JWT_SECRET, {
      expiresIn: '14d',
      subject: 'refresh_token',
      issuer: 'twitch.lukekeum.me',
    });
  }
}

type TokenPayload = string | Buffer | object;
