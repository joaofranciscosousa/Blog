import "./Login.css";
import { useState, useEffect, ChangeEvent, useContext } from "react";
import axios from "../../Axios";
import { globalContext } from "../../Context";

const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { isLoggedIn } = globalContext();

    function Login() {
        axios
            .post("/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                alert("Usuário autenticado com sucesso!");
                window.location.href = "/";
            })
            .catch((err) => {
                alert(err.response.data.err);
            });
    }

    return (
        <div className="login">
            <div className="login_container">
                <input
                    className="form-control mb-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    value={email}
                    type="email"
                    placeholder="email@exemplo.com"
                />
                <input
                    className="form-control mb-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    value={password}
                    type="password"
                    placeholder="******"
                />
                <button
                    type="submit"
                    onClick={Login}
                    className="btn btn-success"
                >
                    Logar
                </button>
            </div>
        </div>
    );
};

export default Login;
