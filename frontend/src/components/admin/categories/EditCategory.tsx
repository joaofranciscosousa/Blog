import HeaderUser from "../header/HeaderUser";
import { useEffect, useState } from "react";
import axios from "../../../Axios";
import { useParams } from "react-router-dom";

const EditCategory = (): JSX.Element => {
    const [title, setTitle] = useState<string>("");

    const { id } = useParams<string>();

    useEffect(() => {
        axios
            .get(`/categories/${id}`)
            .then((res) => {
                setTitle(res.data.title);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function Update(){
        axios
            .put(`/categories/${id}`, {
                title: title,
            })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <HeaderUser />
            <div className="container">
                <hr />
                <div className="card">
                    <div className="card-header">
                        <h2>Editar Categoria</h2>
                    </div>
                    <div className="card-body">
                        <input
                            className="form-control mb-3"
                            type="text"
                            placeholder="Título do Artigo"
                            value={title}
                            onChange={(e: any) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                Update();
                            }}
                            className="btn btn-success"
                        >
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
