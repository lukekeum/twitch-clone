import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StreamSetting } from './streamSetting.entity';

@Entity('cagegories')
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name: string;

  @Field(() => String)
  @Column('varchar', { nullable: true })
  banner_img: string;

  @Field(() => [StreamSetting])
  @OneToMany(() => StreamSetting, (setting) => setting.category)
  streamings: StreamSetting[];
}
