import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AppDataSource } from "../data-source";

import routes from "../routes/routes";

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.config();
        this.middlewares();
        this.database();
        this.routes();
    }

    private config(): void {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(cookieParser());
    }

    private middlewares(): void {
        this.express.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"],
                methods: ["GET", "POST", "PUT", "DELETE"],
            })
        );
    }

    private database(): void {
        AppDataSource.initialize()
            .then(() => {
                console.log("Database Connected");
            })
            .catch((err) => {
                console.log(err)

                console.log("Error: Database not connected");
            });
    }

    private routes(): void {
        this.express.use("/", routes);
    }
}

export default new App().express;
