import { Request, Response } from "express";
import slugify from "slugify";
import { AppDataSource } from "../data-source";
import { Category } from "../entity";

class CategoryController {
    // get all
    async index(req: Request, res: Response): Promise<Response> {
        const database = AppDataSource.getRepository(Category);
        const CategoryList = await database.find();

        if (!CategoryList) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(CategoryList);
    }

    // get by id
    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!/^-?\d+$/.test(id)) {
            return res
                .status(400)
                .json({ message: "O campo ID deve ser um número inteiro" });
        }

        const database = AppDataSource.getRepository(Category);
        const CategoryListId = await database.findOne({
            where: { id: Number(id) },
        });

        if (!CategoryListId) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(CategoryListId);
    }

    // get by slug
    async showSlug(req: Request, res: Response): Promise<Response> {
        const { slug } = req.params;

        const database = AppDataSource.getRepository(Category);
        const CategoryListSlug = await database.findOne({
            where: { slug: slug },
            relations: {
                article: true
            }
        });

        if (!CategoryListSlug) {
            return res.status(400).json({ err: "Nenhum dado encontrado!" });
        }

        return res.status(200).json(CategoryListSlug);
    }

    // post new data
    async store(req: Request, res: Response): Promise<Response> {
        const { title } = req.body;

        if (title === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(Category);

        try {
            const newData = database.create({
                title: title,
                slug: slugify(title),
            });

            database.save({ title: title, slug: slugify(title) });

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
        const { title } = req.body;

        if (!/^-?\d+$/.test(id)) {
            return res
                .status(400)
                .json({ message: "O campo ID deve ser um número inteiro" });
        }

        if (title === "") {
            return res.status(400).json({ err: "Digite os dados válidos" });
        }

        const database = AppDataSource.getRepository(Category);
        const data = await database.findOne({ where: { id: Number(id) } });

        if (!data) {
            return res.status(400).json({ message: "Dado não encontrado!" });
        }

        data.title = title;
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

        const database = AppDataSource.getRepository(Category);
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

export default new CategoryController();
