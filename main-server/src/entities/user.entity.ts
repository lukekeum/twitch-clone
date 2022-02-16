import GenerateToken from '@src/utils/generateToken.class';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { RefreshToken } from './refreshToken.entity';
import { UserProfile } from './userProfile.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { nullable: false, length: 255, unique: true })
  identifier: string;

  @Column('varchar', { nullable: false })
  password: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

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

    const refreshToken = GenerateToken.generateAccessToken({
      user_id: this.id,
      token_id: authToken.id,
    });
    const accessToken = GenerateToken.generateAccessToken({
      user_id: this.id,
    });

    return { refreshToken, accessToken };
  }
}
