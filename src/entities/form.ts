import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./user"
import roles from "../constants/roles"


@Entity()
export default class Form {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', default: '' })
    role: roles
 
    @Column({ type: 'varchar', default: '' })
    phoneNumber: string

    @Column({ type: 'varchar', default: '' })
    firstName: string;

    @Column({ type: 'varchar', default: '' })
    lastName: string;

    @Column({ type: 'varchar', default: '' })
    region: string;

    @Column({ type: 'varchar', default: '' })
    cvFile: string;

    @Column()
    languages: string[];

    @Column({ type: 'varchar', default: '' })
    status: string;

    

    @ManyToOne(() => User, user => user.app)
    user: User;


}