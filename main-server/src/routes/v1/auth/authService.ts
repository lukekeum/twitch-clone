import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { FastifyReply, FastifyRequest } from 'fastify';
import { compare } from 'bcrypt';
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

  static async register(req: FastifyRequest, res: FastifyReply) {
    // TODO: implement register
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
