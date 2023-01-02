import { useEffect, useState } from "react";
import HeaderUser from "../header/HeaderUser";
import axios from "../../../Axios";
import { Editor } from "@tinymce/tinymce-react";

interface Categories {
    id: number;
    title: string;
}

const NewArticle = (): JSX.Element => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [body, setBody] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        axios
            .get("/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {});
    }, []);

    function NewArticle() {
        axios
            .post("/articles", {
                body: body,
                title: title,
                categoryId: categoryId,
            })
            .then((res) => {
                alert(res.data.message);
                setBody("");
                useState("");
                setCategoryId(null);
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
                        <h2>Novo Artigo</h2>
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
                        <Editor
                            onEditorChange={(newValue, editor) => {
                                setBody(newValue);
                                setText(editor.getContent({ format: "text" }));
                            }}
                            value={body}
                            apiKey="jsj48moh44111x4759zmylsmo7h44utmrybbzubvdc7dun7j"
                            init={{
                                height: 400,
                                language: "pt_BR",
                                plugins: [
                                    "advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons",
                                ],
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <br />
                        <label htmlFor="selectCategoryNew">Categoria</label>
                        <select
                            id="selectCategoryNew"
                            onChange={(e: any) => {
                                setCategoryId(e.target.value);
                            }}
                            className="form-control mb-3"
                        >
                            <option selected>Selecione uma categoria</option>
                            {categories.map(({ id, title }) => (
                                <option key={id} value={id}>
                                    {title}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={NewArticle}
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

export default NewArticle;
