import HeaderUser from "./header/HeaderUser";
import axios from "../../Axios";
import { useEffect, useState } from "react";

interface Categories {
    id: number;
    title: string;
    slug: string;
}

const CategoriesCrud = (): JSX.Element => {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        axios
            .get("/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                setCategories([]);
            });
    }, []);

    function DeleteCategory(id: number) {
        axios
            .delete(`/categories/${id}`)
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.response.data.err);
            });
    }

    return (
        <div>
            <HeaderUser />
            <div className="container">
                <hr />
                <h2>Categorias</h2>
                <a href="/categorias/novo" className="btn btn-success">
                    Adicionar Categoria
                </a>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(({ id, title }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>
                                    <a
                                        href={`/admin/categoria/${id}`}
                                        className="btn btn-success"
                                    >
                                        Editar
                                    </a>
                                    &nbsp;
                                    <a
                                        onClick={() => {
                                            DeleteCategory(id);
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

export default CategoriesCrud;
