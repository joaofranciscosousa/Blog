import HeaderUser from "./header/HeaderUser";
import axios from "../../Axios";
import { useEffect, useState } from "react";

interface Articles {
    id: number;
    title: string;
    category: {
        title: string | null;
    };
}

const ArticlesCrud = (): JSX.Element => {
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

    function deleteArticle(id: number) {
        axios
            .delete(`/articles/${id}`)
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert("Não foi possível deletar");
            });
    }

    return (
        <div>
            <HeaderUser />
            <div className="container">
                <hr />
                <h2>Artigos</h2>
                <a href="/artigos/novo" className="btn btn-success">
                    Adicionar Artigo
                </a>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(({ id, title, category }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{category?.title}</td>
                                <td>
                                    <a
                                        href={`/admin/artigo/${id}`}
                                        className="btn btn-success"
                                    >
                                        Editar
                                    </a>
                                    &nbsp;
                                    <a
                                        onClick={() => {
                                            deleteArticle(id);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Deletar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArticlesCrud;
