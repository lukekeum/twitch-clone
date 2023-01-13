import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { CustomError, ErrorType } from '../utils/customError.class';
import axios from 'axios';

interface ResponseData {
  id: string;
  email: string;
  identifier: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: null;
  streamSetting: {
    id: string;
    fk_user_id: string;
    streamKey: string;
    title: string;
    description: string;
    updatedAt: string;
    lastStreamed: string;
  };
}

const rootRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get(
    '/live/:identifier',
    async (req: FastifyRequest<{ Params: { identifier: string } }>, res) => {
      const { identifier } = req.params;
      const response = await axios.get(
        `${process.env.SERVER_ADDRESS}/v1/user/user?id=${identifier}`
      );

      if (response.status === 404) {
        throw new CustomError({
          type: ErrorType.NOT_FOUND,
          message: 'User not found',
        });
      }

      const data = response.data as ResponseData;

      res.redirect(
        302,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${process.env.MEDIA_ADDRESS}/live/${data.streamSetting.streamKey}/index.m3u8`
      );

      return;
    }
  );

  fastify.get('/ping', async () => {
    return {
      message: 'pong',
      version: 'v1',
    };
  });

  done();
};

export default rootRoute;
