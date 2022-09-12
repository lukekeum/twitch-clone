import { Config } from 'apollo-server-fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import generateSchema from './schema';

export default function getGraphqlServerOptions() {
  const schema = generateSchema();

  const graphqlServerOption: Config = {
    schema,
    context: ({ request: req, reply: res }) => ({
      req,
      res,
      cookies: { accessToken: req.cookies.access_token, qid: req.cookies.qid },
    }),
  };

  return graphqlServerOption;
}

export interface ContextType {
  req: FastifyRequest;
  res: FastifyReply;
  cookies: {
    accessToken?: string;
    qid?: string;
  };
}
