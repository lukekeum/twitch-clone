import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { FastifyReply, FastifyRequest } from 'fastify';
import { compare } from 'bcrypt';
import { decode } from 'jsonwebtoken';
import { setCookie } from '@src/utils/setCookie';
import { UserProfile } from '@src/entities/userProfile.entity';
import { StreamSetting } from '@src/entities/streamSetting.entity';
import { ResponseMessage } from '@src/utils/errors/responseMessage';

export default class AuthService {
  static async login(
    req: FastifyRequest<{ Body: LoginBody }>,
    res: FastifyReply
  ) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError({
        type: ErrorType.UNAUTHORIZED,
        message: ResponseMessage.INCORRECT_PASSWORD,
      });
    }

    const token = await user.generateTokens();

    void setCookie(res, 'qid', token.refreshToken);
    void setCookie(res, 'access_token', token.accessToken);

    return res.status(201).send({
      message: ResponseMessage.LOGGED_IN,
    });
  }

  static async register(
    req: FastifyRequest<{ Body: RegisterBody }>,
    res: FastifyReply
  ) {
    const { email, password, identifier, nickname } = req.body;

    const emailOrIdentifierUser = await User.createQueryBuilder('user')
      .where('user.email = :email OR user.identifier = :identifier', {
        email: email,
        identifier: identifier,
      })
      .getOne();

    if (emailOrIdentifierUser) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.ALREADY_EXISTS,
      });
    }
    try {
      await this.addUser({ email, password, identifier, nickname });

      return res.status(201).send({
        message: ResponseMessage.REGISTERED,
      });
    } catch (err) {
      throw new CustomError({
        type: ErrorType.INTERNAL_SERVER_ERROR,
        message: ResponseMessage.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async refreshToken(req: FastifyRequest, res: FastifyReply) {
    const { qid: refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.TOKEN_NOT_FOUND,
      });
    }

    const decoded = decode(refreshToken) as {
      user_id: string;
      token_id: string;
      exp: number;
    };

    const { user_id: userId, token_id: tokenId, exp } = decoded;

    const user = await User.findOne(userId);

    if (!user) {
      throw new CustomError({
        type: ErrorType.UNAUTHORIZED,
        message: ResponseMessage.INVALID_TOKEN,
      });
    }

    const { accessToken, refreshToken: qid } = user.refreshToken(
      tokenId,
      exp,
      refreshToken
    );

    setCookie(res, 'access_token', accessToken);
    setCookie(res, 'qid', qid);

    return res.status(201).send({
      message: ResponseMessage.REFRESHED_TOKEN,
    });
  }

  static async logout(req: FastifyRequest, res: FastifyReply) {
    const { qid: refreshToken, access_token: accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: 'Refresh token or access token not found',
      });
    }

    res.clearCookie('qid');
    res.clearCookie('access_token');

    return res.status(201).send({
      message: ResponseMessage.LOGGED_OUT,
    });
  }

  static async addUser(payload: RegisterBody) {
    const { email, password, identifier, nickname } = payload;

    const user = await User.create({ email, password, identifier }).save();
    const userProfile = await UserProfile.create({
      nickname,
      fk_user_id: user.id,
    }).save();
    const streamSetting = await StreamSetting.create({
      fk_user_id: user.id,
    }).save();

    return { user, userProfile, streamSetting };
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
  identifier: string;
  nickname: string;
}
