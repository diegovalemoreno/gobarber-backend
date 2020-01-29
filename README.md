# gobarber
## Aula 1 - Configurando o Projeto

Uma maneira legal de estruturar o backend é utilizar Classes.

Nesse commit foi criado um projeto com node, usando yarn init -y e instalado a dependência do express.

Foi estruturado as pastas, separando a lógica da aplicação. As rotas são middlewares também, porém, elas ficam separadas dos middlewares para dar mais semântica.

O servidor foi inicializado de dentro do server.js onde a instância do app foi importada, isso desacopla para facilitar no teste.

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula1