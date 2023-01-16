import { randomBytes } from 'crypto';

export function generateStreamId(): number {
  return Math.floor(Math.random() * 1000000000);
}

export function generateStreamKey(): string {
  return randomBytes(15).toString('hex');
}
