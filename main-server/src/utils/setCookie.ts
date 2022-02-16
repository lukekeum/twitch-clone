import { FastifyReply } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';

export function setCookie(
  res: FastifyReply,
  key: string,
  value: string,
  options?: CookieSerializeOptions
) {
  const option: CookieSerializeOptions = {
    httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    path: '/',
    ...options,
  };

  return res.setCookie(key, value, option);
}
