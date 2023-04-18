import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axios from "../../Axios";
import Header from "../header/Header";

interface CategorieId extends Params {
    slug: string | undefined;
}

interface CategorieArticle {
    id: number;
    title: string;
    slug: string;
    article: [
        {
            id: number;
            title: string;
            slug: string;
        }
    ];
}

const CategoryList: React.FC = () => {
    const [categorie, setCategorie] = useState<CategorieArticle>({
        id: 0,
        title: "",
        slug: "",
        article: [
            {
                id: 0,
                title: "",
                slug: "",
            },
        ],
    });

    const { slug } = useParams() as CategorieId;

    useEffect(() => {
        axios
            .get(`/categorie/${slug}`)
            .then((res) => {
                setCategorie(res.data);
            })
            .catch((err) => {
                alert(err.response.data.err);
            });
    }, [slug]);

    return (
        <div>
            <Header />
            <div className="container">
                <h1>{categorie?.title}</h1>
                <hr />
                {categorie?.article.map(({ id, title, slug }) => (
                    <div className="card mb-4" key={id}>
                        <div className="card-header">{title}</div>
                        <div className="card-body">
                            <a
                                href={`/artigo/${slug}`}
                                className="btn btn-success"
                            >
                                Ler artigo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
