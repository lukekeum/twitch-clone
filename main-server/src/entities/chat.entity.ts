import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('chats')
@ObjectType()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { nullable: false })
  message: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  target: User;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
