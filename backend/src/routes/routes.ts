import { Router } from "express";
import {
    CategoryController,
    ArticleController,
    UserController,
} from "../controllers";
import AuthJwt from "../middlewares/AuthJwt";

const routes = Router();

routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show); // get by Id
routes.get("/categorie/:slug", CategoryController.showSlug); // get by Slug
routes.post("/categories", CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.delete);

routes.get("/articles", ArticleController.index);
routes.get("/articles/:id", ArticleController.show); // get by Id
routes.get("/article/:slug", ArticleController.showSlug); // get by Slug
routes.post("/articles", ArticleController.store);
routes.put("/articles/:id", ArticleController.update);
routes.delete("/articles/:id", ArticleController.delete);

routes.post("/user/new", UserController.newUser);
routes.post("/login", UserController.login);
routes.get("/logout", UserController.logout);
routes.get("/logged", AuthJwt.Verify, UserController.logged);

export default routes;
