import {
  generateStreamId,
  generateStreamKey,
} from '@src/utils/generateStreamKey';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';
import { Field, ID, ObjectType } from 'type-graphql';
import { Category } from './category.entity';

@Entity('stream_settings')
@ObjectType()
export class StreamSetting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  fk_user_id: string;

  @Field(() => String)
  @Column('varchar', { name: 'stream_key', length: 255, unique: true })
  streamKey: string;

  @Exclude()
  @Column('integer', {
    name: 'primary_stream_id',
    unique: true,
  })
  primaryStreamId: number;

  @Exclude()
  @Column('varchar', {
    name: 'primary_stream_key',
  })
  primaryStreamKey: string;

  @Field(() => Boolean)
  @Column('boolean', { name: 'latency_mode', default: false })
  latencyMode: boolean;

  @Field(() => Boolean)
  @Column('boolean', { name: 'adult_contents', default: false })
  adultContents: boolean;

  @Field(() => String)
  @Column('varchar', { default: '제목없음' })
  title: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  description: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ManyToOne(() => Category)
  category: Category;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: new Date() })
  lastStreamed: Date;

  @BeforeInsert()
  generateStreamKeyBeforeInsert() {
    this.primaryStreamKey = generateStreamKey();
    this.primaryStreamId = generateStreamId();

    this.streamKey = `live_${this.primaryStreamId}_${this.primaryStreamKey}`;
  }

  generateStreamKey() {
    this.primaryStreamId = generateStreamId();
  }
}
