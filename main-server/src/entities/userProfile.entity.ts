import { Field, ID, ObjectType } from 'type-graphql';
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
@ObjectType()
export class UserProfile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { length: 255 })
  nickname: string;

  @Field(() => String)
  @Column('varchar', { name: 'avatar_url', nullable: true })
  avatarURL: string;

  @Field(() => String)
  @Column('varchar', { name: 'banner_url', nullable: true })
  banner_url: string;

  @Field(() => String)
  @Column('varchar', { nullable: true, length: 255 })
  bio: string;

  @Column('uuid')
  fk_user_id: string;

  @OneToOne(() => User, (user) => user.userProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
