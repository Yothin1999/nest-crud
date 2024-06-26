
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name:"tb_users"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ default: true })
    isActive: boolean;
}
