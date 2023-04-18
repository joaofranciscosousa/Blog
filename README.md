# Instalação do Projeto:

- Crie o arquivo `.env` a partir do arquivos `.env.sample` - variáveis já estão setadas para uso local
- Execute o comando `./install.sh` para instalar todas as dependencias dos microserviços
- Execute o comando `docker compose up -d api` para subir o container da api
- Acesse o Shell do container da api e execute o comando `npm run typeorm migration:run` para executar as migrations
- Execute o comando `docker compose up -d` para subir todos os containers e iniciar o projeto
