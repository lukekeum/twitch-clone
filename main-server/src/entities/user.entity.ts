import GenerateToken from '@src/utils/generateToken.class';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';
import { RefreshToken } from './refreshToken.entity';
import { UserProfile } from './userProfile.entity';
import { StreamSetting } from './streamSetting.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { nullable: false, length: 255, unique: true })
  identifier: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  password: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @OneToOne(() => StreamSetting, (ss) => ss.user)
  streamSetting: StreamSetting;

  @ManyToOne(() => User)
  followers: User[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 3);
  }

  async generateTokens() {
    const authToken = new RefreshToken();
    authToken.fk_user_id = this.id;
    await authToken.save();

    const refreshToken = GenerateToken.generateRefreshToken({
      user_id: this.id,
      token_id: authToken.id,
    });
    const accessToken = GenerateToken.generateAccessToken({
      user_id: this.id,
    });

    return { refreshToken, accessToken };
  }

  refreshToken(
    tokenId: string,
    refreshTokenExp: number,
    originalRefreshToken: string
  ) {
    const now = new Date().getTime();
    const diff = refreshTokenExp * 1000 - now;
    let refreshToken = originalRefreshToken;

    if (diff < 1000 * 60 * 60 * 24 * 15) {
      refreshToken = GenerateToken.generateRefreshToken({
        user_id: this.id,
        token_id: tokenId,
      });
    }
    const accessToken = GenerateToken.generateAccessToken({
      user_id: this.id,
    });

    return { refreshToken, accessToken };
  }
}
