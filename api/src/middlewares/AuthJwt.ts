import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestUser extends Request {
    token: string;
    loggedUser: {
        id: number;
        email: string;
        username: string;
    };
}

class AuthJwt{
    async Verify(req: RequestUser, res: Response, next: NextFunction): Promise<Response> {
        const authToken = req.cookies.token;

    if (authToken) {
        jwt.verify(
            authToken,
            "aappsecrett",
            (
                err: any,
                data: { id: number; email: string; username: string }
            ) => {
                if (err) {
                    return res.status(401).json({
                        err: "Token inválido",
                        login: false,
                    });
                } else {
                    req.token = authToken;
                    req.loggedUser = {
                        id: data.id,
                        email: data.email,
                        username: data.username,
                    };
                    next();
                }
            }
        );
    } else {
        return res.status(401).json({
            err: "Autenticação inválida",
            login: false,
        });
    }
    }
}

export default new AuthJwt()
