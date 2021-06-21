import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workers', {
  synchronize: false,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  pass: string;
}
