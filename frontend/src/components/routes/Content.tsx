import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ArticlesList from "../articles/ArticlesList";
import Article from "../articles/Article";
import CategoryList from "../categorie/CategoryList";
import Login from "../admin/Login";
import { globalContext } from "../../Context";
import ArticlesCrud from "../admin/ArticlesCrud";
import CategoriesCrud from "../admin/CategoriesCrud";
import NewArticle from "../admin/articles/NewArticle";
import EditArticle from "../admin/articles/EditArticle";
import NewCategory from "../admin/categories/NewCategory";
import EditCategory from "../admin/categories/EditCategory";
import Home from "../admin/Home";

const Content: React.FC = () => {
    const { isLoggedIn } = globalContext();

    return (
        <>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/artigos" element={<ArticlesCrud />} />
                    <Route path="/categorias" element={<CategoriesCrud />} />
                    <Route path="/artigos/novo" element={<NewArticle />} />
                    <Route path="/categorias/novo" element={<NewCategory />} />
                    <Route path="/admin/artigo/:id" element={<EditArticle />} />
                    <Route path="/admin/categoria/:id" element={<EditCategory />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<ArticlesList />} />
                    <Route path="/categoria/:slug" element={<CategoryList />} />
                    <Route path="/artigo/:slug" element={<Article />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            )}
        </>
    );
};

export default Content;
