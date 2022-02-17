import { streamkeyGenerator } from '@src/utils/streamKeyGenerator';
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

@Entity('stream_settings')
export class StreamSetting extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  fk_user_id: string;

  @Column('varchar', { name: 'stream_key', length: 255 })
  streamKey: string;

  @Column('integer', {
    name: 'primary_stream_id',
    default: streamkeyGenerator(),
    unique: true,
  })
  primaryStreamId: number;

  @Column('bool', { name: 'is_mature_content', default: false })
  isMatureContent: boolean;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
