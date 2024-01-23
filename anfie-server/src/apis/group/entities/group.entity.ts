import { BaseEntity } from 'src/database';
import { Entity } from 'typeorm';

@Entity()
export class Group extends BaseEntity<Group> {}
