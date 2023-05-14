import { Column, Entity, OneToMany, PrimaryGeneratedColumn,JoinColumn,JoinTable, ManyToMany} from "typeorm"
import Post from "./post"
import Role from "./role"
import Form from "./form"


@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    phoneNumber: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    region: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]



    @OneToMany(() => Form, app => app.user)
    app: Form[];

}

