import HeaderUser from "./header/HeaderUser";

const Home = (): JSX.Element => {
    return (
        <div>
            <HeaderUser />
            <div className="container">
            <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Simples projeto Full Stack</h5>
                        <p className="card-text">Este é um projeto full stack simples construído em React e Bootstrap para FrontEnd - Express, Typeorm e Sql para o BackEnd, com sistema de login e usuários para cadastro de artigos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
