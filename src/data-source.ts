import "reflect-metadata"
import { DataSource } from "typeorm"
import Comment from "./entity/Comment"
import Post from "./entity/Post"
import Sub from "./entity/Sub"
import User from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ff5395!!",
    database: "redditclone",
    synchronize: true,
    logging: true,
    entities: [User, Post, Sub, Comment],
    migrations: [],  
    subscribers: [], 
})


