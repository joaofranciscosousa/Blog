import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Axios";
import Header from "../header/Header";

interface Article {
    id: number | null;
    title: string;
    slug: string;
    body: string;
    category: {
        title: string;
    }
}

const Article: React.FC = () => {
    const [article, setArticle] = useState<Article>({
        id: null,
        title: "",
        slug: "",
        body: "",
        category: {
            title: ""
        },
    });
    const { slug } = useParams<string>();

    useEffect(() => {
        axios
            .get(`/article/${slug}`)
            .then((res) => {
                setArticle(res.data);
            })
            .catch((err) => {
                alert(err.response.data.err)
            });
    }, [slug]);

    return (
        <div>
            <Header />
            <div className="container">
                <h1>{article.category.title}</h1>
                <hr />
                <div className="card">
                    <div className="card-header">
                        <h2>{article.title}</h2>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.body }}
                        className="card-body"
                    ></div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Article;
