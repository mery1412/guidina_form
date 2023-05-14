import { DataSource } from "typeorm"
import User from "./entities/user"
import Post from "./entities/post"
import Form from "./entities/form"
import Role from "./entities/role"




export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "marichou2004",
    database: "alguide_db",
    synchronize: true,
    logging: false,
    entities: [User, Post, Form, Role],
    subscribers: [],
    migrations: [],
})