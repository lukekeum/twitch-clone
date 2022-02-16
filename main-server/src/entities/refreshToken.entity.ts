import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  fk_user_id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('bool', { default: false })
  is_revoked: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;
}
