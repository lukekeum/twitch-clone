import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { FastifyReply, FastifyRequest } from 'fastify';
import { compare } from 'bcrypt';
import { decode } from 'jsonwebtoken';
import { setCookie } from '@src/utils/setCookie';
import { UserProfile } from '@src/entities/userProfile.entity';

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
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError({
        type: ErrorType.UNAUTHORIZED,
        message: 'Incorrect password',
      });
    }

    const token = await user.generateTokens();

    void setCookie(res, 'qid', token.refreshToken);
    void setCookie(res, 'access_token', token.accessToken);

    return res.status(201).send({
      message: 'Logged in',
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
        message: 'Email or identifier already exists',
      });
    }
    try {
      await this.addUser({ email, password, identifier, nickname });

      return res.status(201).send({
        message: 'Registered',
      });
    } catch (err) {
      throw new CustomError({
        type: ErrorType.INTERNAL_SERVER_ERROR,
        message: 'Error while creating user',
      });
    }
  }

  static async refreshToken(req: FastifyRequest, res: FastifyReply) {
    const { qid: refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: 'Refresh token not found',
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
        message: 'Invalid RefreshToken',
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
      message: 'Refreshed',
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
      message: 'Logged out',
    });
  }

  static async addUser(payload: RegisterBody) {
    const { email, password, identifier, nickname } = payload;

    const user = await User.create({ email, password, identifier }).save();
    const userProfile = await UserProfile.create({
      nickname,
      fk_user_id: user.id,
    }).save();

    return { user, userProfile };
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
