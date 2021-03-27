import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../../genres/entities/Genre';
import { Order } from '../../orders/entities/Order';

import { User } from '../../users/entities/User';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(() => Order, (order) => order.games)
  orders: Order[];

  @ManyToMany(() => Genre, (genre) => genre.games)
  genres: Genre[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
