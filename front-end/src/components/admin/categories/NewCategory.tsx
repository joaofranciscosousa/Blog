import { useState } from "react";
import HeaderUser from "../header/HeaderUser";
import axios from "../../../Axios";

const NewCategory = (): JSX.Element => {
    const [title, setTitle] = useState<string>("");

    function NewCategory() {
        axios
            .post("/categories", {
                title: title,
            })
            .then((res) => {
                alert(res.data.message);
                setTitle("");
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
                <div className="card">
                    <div className="card-header">
                        <h2>Nova Categoria</h2>
                    </div>
                    <div className="card-body">
                        <input
                            className="form-control mb-3"
                            type="text"
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>
                            ) => {
                                setTitle((e.target as HTMLInputElement).value);
                            }}
                            value={title}
                            placeholder="Título do Artigo"
                        />
                        <button
                            onClick={NewCategory}
                            className="btn btn-success"
                        >
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCategory;
