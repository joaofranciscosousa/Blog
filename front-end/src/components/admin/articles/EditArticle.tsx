import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../Axios";
import HeaderUser from "../header/HeaderUser";
import { Editor } from "@tinymce/tinymce-react";

interface Categories {
    id: number;
    title: string;
}

const EditArticle = (): JSX.Element => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [text, setText] = useState<string>("");

    const { id } = useParams<string>();

    useEffect(() => {
        axios
            .get(`/articles/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setBody(res.data.body);
                setCategoryId(res.data.categoryId);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        axios
            .get("/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {});
    }, []);

    function Update() {
        axios
            .put(`/articles/${id}`, {
                title: title,
                body: body,
                categoryId: categoryId,
            })
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
                <div className="card mb-5">
                    <div className="card-header">
                        <h2>Editar Artigo</h2>
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
                        <Editor
                            onEditorChange={(newValue, editor) => {
                                setBody(newValue);
                                setText(editor.getContent({ format: "text" }));
                            }}
                            value={body}
                            apiKey="jsj48moh44111x4759zmylsmo7h44utmrybbzubvdc7dun7j"
                            init={{
                                height: 500,
                                language: "pt_BR",
                                plugins: [
                                    "advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons",
                                ],
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <br />
                        <label htmlFor="selectCategory">Categoria</label>
                        <select
                            id="selectCategoryEdit"
                            onChange={(e: any) => {
                                setCategoryId(e.target.value);
                            }}
                            name="category"
                            className="form-control mb-3"
                        >
                            {categories.map(({ id, title }) =>
                                id == categoryId ? (
                                    <option key={id} value={id} selected>
                                        {title}
                                    </option>
                                ) : (
                                    <option key={id} value={id}>
                                        {title}
                                    </option>
                                )
                            )}
                        </select>
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

export default EditArticle;
