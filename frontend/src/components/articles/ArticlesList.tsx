import React, { useState, useEffect } from "react";
import axios from "../../Axios";
import Header from "../header/Header";

interface Articles {
    id: number;
    title: string;
    slug: string;
}

const ArticlesList: React.FC = () => {
    const [articles, setArticles] = useState<Articles[]>([]);

    useEffect(() => {
        axios
            .get("/articles")
            .then((res) => {
                setArticles(res.data);
            })
            .catch((err) => {
                setArticles([]);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Simples projeto Full Stack</h5>
                        <p className="card-text">Este é um projeto full stack simples construído em React e Bootstrap para FrontEnd - Express, Typeorm e Sql para o BackEnd, com sistema de login e usuários para cadastro de artigos</p>
                    </div>
                </div>
                <hr />
                <h1>Todas as categorias</h1>
                <hr />
                {articles.map(({ id, title, slug }) => (
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

export default ArticlesList;
