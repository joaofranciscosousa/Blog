import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface RequestUser extends Request{
    token:string;
    loggedUser: {
        id: number;
        email: string;
        username: string;
    }
}

class UserController {
    // post new data
    async newUser(req: Request, res: Response): Promise<Response> {
        const { email, password, username } = req.body;

        if (email === "" || password === "" || username === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(User);
        const data = await database.findOne({ where: { email: email } });

        if (data) {
            return res.status(400).json({
                err: "Email enviado já está cadastrado em nosso banco de dados!",
            });
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            try {
                const newData = database.create({
                    email: email,
                    password: hash,
                    username: username,
                });

                database.save({
                    email: email,
                    password: hash,
                    username: username,
                });

                return res.status(200).json({
                    message: "Usuário cadastrado com sucesso!",
                    newData,
                });
            } catch (err: any) {
                return res.status(400).json({
                    err: "Não foi possível cadastrar um novo usuário",
                });
            }
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        var { email, password } = req.body;
        
        if (email === "" || password === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(User);
        const user = await database.findOne({ where: { email: email } });

        if (user) {
            var correct = bcrypt.compareSync(password, user.password);
            if (correct) {
                jwt.sign(
                    { id: user.id, email: user.email, username: user.username },
                    "aappsecrett",
                    { expiresIn: 6000000 },
                    (err, token) => {
                        if (err) {
                            return res.status(400).json({
                                err: "Ocorreu um erro ao realizar sua autenticação",
                            });
                        } else {
                            return res
                                .status(200)
                                .cookie("token", token, {
                                    httpOnly: true,
                                    maxAge: 6000000,
                                })
                                .json({ token: token });
                        }
                    }
                );
            } else {
                return res.status(400).json({ err: "Senha não confere" });
            }
        } else {
            return res.status(400).send({ err: "Email não confere" });
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        return res.status(200).clearCookie("token").end();
    }

    async logged(req: RequestUser, res: Response): Promise<Response> {
        var userInfo = req.loggedUser;
        return res.status(200).json({ login: true, user: userInfo });
    }
}

export default new UserController();
