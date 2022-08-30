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
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity('stream_settings')
export class StreamSetting extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  fk_user_id: string;

  @Exclude()
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

  @Column('bool', { name: 'is_mature_content', default: false })
  isMatureContent: boolean;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
