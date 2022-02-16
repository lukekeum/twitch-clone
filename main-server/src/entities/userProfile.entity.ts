import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  nickname: string;

  @Column('varchar', { name: 'avatar_url', nullable: true })
  avatarURL: string;

  @Column('varchar', { nullable: true, length: 255 })
  bio: string;

  @Column('uuid')
  fk_user_id: string;

  @OneToOne(() => User, (user) => user.userProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
