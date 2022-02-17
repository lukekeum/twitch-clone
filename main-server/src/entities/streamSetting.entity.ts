import {
  generateStreamId,
  generateStreamKey,
} from '@src/utils/generateStreamKey';
import {
  BaseEntity,
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
  @Column('varchar', { name: 'stream_key', length: 255 })
  get streamKey(): string {
    return `live_${this.primaryStreamId}_${this.primaryStreamKey}`;
  }

  @Exclude()
  @Column('integer', {
    name: 'primary_stream_id',
    default: generateStreamId(),
    unique: true,
  })
  primaryStreamId: number;

  @Exclude()
  @Column('varchar', {
    name: 'primary_stream_key',
    default: generateStreamKey(),
  })
  primaryStreamKey: string;

  @Column('bool', { name: 'is_mature_content', default: false })
  isMatureContent: boolean;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  genKey() {
    this.primaryStreamId = generateStreamId();
    this.primaryStreamKey = generateStreamKey();
  }
}
