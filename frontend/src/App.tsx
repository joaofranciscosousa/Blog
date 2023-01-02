import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Content from "./components/routes/Content";
import axios from "./Axios";
import { Context } from "./Context";
const Loading = require("./images/Loading.gif");

export const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<string>("");

    useEffect(() => {
        axios
            .get("/logged")
            .then((res) => {
                setCurrentUser(res.data.user.username);
                setIsLoggedIn(res.data.login);
            })
            .catch((err) => {
                setIsLoggedIn(err.response.data.login);
            });
    }, []);

    return (
        <Context.Provider value={{ isLoggedIn, currentUser }}>
            {isLoggedIn === null ? (
                <div className="app_loading">
                    <img src={Loading} />
                </div>
            ) : (
                <Router>
                    <Content />
                </Router>
            )}
        </Context.Provider>
    );
};
