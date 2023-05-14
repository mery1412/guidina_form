

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./user"

@Entity() //decorations
export default class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: "text" })
    caption: string

    @Column()
    imgurl: string

    @ManyToOne(type => User)
    user: User


}