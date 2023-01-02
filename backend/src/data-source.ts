import "reflect-metadata"
import { DataSource } from "typeorm"
import { Article, Category, User } from "./entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT),
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    logging: false,
    entities: [Article, Category, User],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    connectorPackage: "mysql2"
})
