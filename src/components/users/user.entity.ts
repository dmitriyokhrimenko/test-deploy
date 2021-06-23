import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buusers', {
  synchronize: false,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  usergroup: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  picture: string;

  @Column()
  parentid: string;

  @Column()
  permissions: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  pass: string;
}
