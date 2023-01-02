import { Request, Response } from "express";
import slugify from "slugify";
import { AppDataSource } from "../data-source";
import { Article } from "../entity";

class ArticleController {
    // get all
    async index(req: Request, res: Response): Promise<Response> {
        const database = AppDataSource.getRepository(Article);
        const ArticleList = await database.find({
            relations: {
                category: true,
            },
        });

        if (!ArticleList) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(ArticleList);
    }

    // get by id
    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!/^-?\d+$/.test(id)) {
            return res
                .status(400)
                .json({ message: "O campo ID deve ser um número inteiro" });
        }

        const database = AppDataSource.getRepository(Article);
        const ArticleListId = await database.findOne({
            where: { id: Number(id) },
            relations: {
                category: true,
            },
        });

        if (!ArticleListId) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(ArticleListId);
    }

    // get by slug
    async showSlug(req: Request, res: Response): Promise<Response> {
        const { slug } = req.params;

        const database = AppDataSource.getRepository(Article);
        const ArticleListSlug = await database.findOne({
            where: { slug: slug },
            relations: {
                category: true,
            },
        });

        if (!ArticleListSlug) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(ArticleListSlug);
    }

    // post new data
    async store(req: Request, res: Response): Promise<Response> {
        var { title, body, categoryId } = req.body;

        if (title === "" || body === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(Article);

        try {
            const newData = database.create({
                title: title,
                body: body,
                slug: slugify(title),
                category: categoryId,
            });

            database.save({
                title: title,
                body: body,
                slug: slugify(title),
                category: categoryId,
            });

            return res
                .status(200)
                .json({ newData, message: "Cadastrado com sucesso!" });
        } catch (err: any) {
            return res
                .status(400)
                .json({ err: "Não foi possível cadastrar um novo dado" });
        }
    }

    // update by ID
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { title, body, categoryId } = req.body;

        if (!/^-?\d+$/.test(id)) {
            return res
                .status(400)
                .json({ message: "O campo ID deve ser um número inteiro" });
        }

        if (title === "" || body === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(Article);
        const data = await database.findOne({ where: { id: Number(id) } });

        if (!data) {
            return res.status(400).json({ err: "Dado não encontrado!" });
        }

        data.title = title;
        data.body = body;
        data.category = categoryId;
        data.slug = slugify(title);

        await database.save(data);

        return res
            .status(200)
            .json({ data, message: "Atualizado com sucesso!" });
    }

    // delete by ID
    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!/^-?\d+$/.test(id)) {
            return res
                .status(400)
                .json({ message: "O campo ID deve ser um número inteiro" });
        }

        const database = AppDataSource.getRepository(Article);
        const data = await database.findOne({ where: { id: Number(id) } });

        if (!data) {
            return res.status(404).json({ message: "Nenhum dado encontrado!" });
        }

        try {
            await database.remove(data);

            return res
                .status(200)
                .json({ message: "Dado deletado com sucesso!" });
        } catch (err: any) {
            return res.status(400).json({ err: "Não foi possível deletar!" });
        }
    }
}

export default new ArticleController();
