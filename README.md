# gobarber
## Aula 1 - Configurando o Projeto

Uma maneira legal de estruturar o backend é utilizar Classes.

Nesse commit foi criado um projeto com node, usando yarn init -y e instalado a dependência do express.

Foi estruturado as pastas, separando a lógica da aplicação. As rotas são middlewares também, porém, elas ficam separadas dos middlewares para dar mais semântica.

O servidor foi inicializado de dentro do server.js onde a instância do app foi importada, isso desacopla para facilitar no teste.

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula1

------------

# gobarber
## Aula 2 - Nodemon & Sucrase
Para utilizar o import/export podemos utilizar o babel ou outras ferramentas, mas nesse projeto iremos utilizar sucrase que é bem rápido e fácil.

yarn add sucrase nodemon -D

Pronto agora só alterar para import/export

Entretanto, não podemos mais rodar node src/index.js para executar o projeto.

Pode ser assim: yarn sucrase-node src/server.js

Mas eu quero utilizar o nodemon também.

Nodemon detecta atualização no código e reinicializa o servidor.

Preciso criar um arquivo `nodemon.json na raiz do projeto, com a seguinte configuração:

{
  "execMap": {
    "js": "sucrase-node"
  }
}
Lá no package.json crio um script:

"scripts": {
    "dev": "nodemon src/server"
  },
e agora posso executar o projeto com: yarn dev

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula2

------------

# gobarber
## Aula 3 - Conceitos de Docker
Docker ajuda a controlar os serviços externos da aplicação: Banco de Dados, Redis, etc.

Como funciona?

**Criação de ambientes isolados (container)**

Você baixa uma imagem com ambiente configurado, você não precisa instalar os softwares na sua máquina e alterar o seu sistema operacional. Quando a gente instala o postgres com Docker ele se torna um subsistema, e fica rodando na máquina virtual do Docker, sem interferir o ambiente, isso é ótimo porque podemos replicar o mesmo ambiente de desenvolvimento ou produção em outras máquinas, sem problema de arquitetura ou diferença em SO.
Os containers expõe as portas para podemos nos conectar nos containers.
Instalando o postgres, sempre usamos a porta :5432, com mongoDB seria na porta :27017, mas trocar portas no Docker é muito simples.
Principais conceitos
Imagem: São os principais serviços que iremos utilizar, ex: postres, mongodb, redis, etc.
Container: é uma instância de uma imagem, se tivermos uma imagem do mongodb, podemos criar um ou mais containers do mongodb, até mesmo para servir para outras aplicações na máquina
Docker Registry (Docker Hub) é onde podemos visualizar e baixar as imagens (ISOs). é basicamente o repositório de imagens, inclusive podemos criar as nossas próprias imagens e hospedar lá.
Dockerfile

Receita de uma imagem: Define como a imagem da nossa aplicação irá funcionar em um outro computador, em um ambiente do zero.
Dockerfile de exemplo para executar a nossa aplicação:
#### Partimos de uma imagem existente
FROM node:10
#### Definimos a pasta e copiamos o arquivos
WORKDIR /usr/app
COPY . ./
#### Instalamos as dependências
RUN yarn
#### Qual porta queremos expor?
EXPOSE 3333
Executamos nossa aplicação
CMD yarn start

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula3

------------

# gobarber
## Aula 4 - Configurando Docker
Baixar o docker [Mac, Linux, Windows](https://docs.docker.com/install/ "Mac, Linux, Windows")

Para ver se está instalado docker -v ou docker -help

Repositório de imagens do [Docker](https://hub.docker.com/ "Docker").

Instalando o [postgres](https://hub.docker.com/_/postgres "postgres")

#### Comando para configurar o Postgres no container criado:

    ❯ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Redirecionamento de Portas, toda vez que algum serviço for chamado na porta **5432** do servidor, será redirecionado para **5432** do container no docker:** -p 5432:5432**

Se já estiver com postgres na máquina sem ter sido instalado pelo Docker, e se estiver executando, você pode alterar na aplicação para: **-p 5433:5432**, isto é, quando for chamado o serviço do postgres 5433, vai ser redirecionado para a porta padrão de dentro do Docker: **5432**. Muito legal esse desacoplamento.

#### Quando já se tem uma imagem no Docker:

###### pasta executar uma imagem:

    ❯ docker run -d 30bf4f039abe
###### Para executar um container:

    ❯ docker  start a46a366365bb
###### Esses caracteres estranhos é o ID da imagem, para ver basta digitar:

    ❯ docker image ls

<!-- DOCKER IMAGE LS -->
<br />
<p align="center">
  <img src="https://github.com/diegovalemoreno/gobarber-backend/blob/aula4/images/docker_image.png" alt="DOCKER IMAGE LS">

  <h3 align="center">docker image ls</h3>
</p>

Vai listar todas as imagens e seus respectivos IDs.

E para conferir se está rodando, só rodar docker ps, com isso ele vai listar todos os containers que estão em execução:

    ❯ docker ps

<!-- DOCKER PS -->
<br />
<p align="center">
  <img src="https://github.com/diegovalemoreno/gobarber-backend/blob/aula4/images/docker_ps.png" alt="DOCKER PS">

  <h3 align="center">docker ps</h3>
</p>

Agora ver o banco funcionando, pode conectar com linha de comando no terminal ou instalar uma GUI chamada **postbird**:

[Linux, Mac e Windows](https://electronjs.org/apps/postbird  "Linux, Mac e Windows") ou [Mac](https://eggerapps.at/postico/ "Mac").

Só usar os dados da conexão para poder conectar-se no postgres.

e criar o banco de dados:
`create database gobarber`


Quando reinicia a máquina, o docker para, para subir novamente só seguir os comandos:

docker ps -a para mostrar todos os container mesmo os que não estão em execução.

###### Para subir o container:
    ❯ docker  start postgres
Pode ser o ID ou o nome do container.

###### Para ver os logs do container:

    ❯ docker logs postgres


O mesmo container pode ser usado para outras aplicações, mas tem como fazer um container apenas para a aplicação.

###### Para remover um container:

    ❯ docker rm "ID ou nome do container"

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula4


------------

# gobarber
## Aula 5 - Sequelize & MVC

Sequelize é um **ORM (Object-relational mapping)**, basicamente ele faz o mapeamento dos objetos como entidade no banco de dados. Os bancos de dados tem um conceito de Entidade, Tabelas, Atributos, e a aplicação tem o conceito de Objetos, Atributos ou propriedades e métodos ou função. O que o ORM faz é mapear o objeto, criando uma tabela e os atributos mapeando para campos do banco de dados. O Sequelize também ajuda a fazer as consultas do banco de dados, em vez de usar SQL nativo, podemos usar objetos com seus respectivos métodos, e escrever javascript para fazer operações de CRUD persistência no BD.

As tabelas do banco de dados se transformam em **Models (MVC)**

No banco de dados temos:

**users, products, productsItem**

e no no JS teremos **Users.js, Products.js, ProductsItem.js.**

###### Diferença entre SQL e SequelizeSQL:

##### **SQL:**

    INSERT INTO users (name, email) VALUES ("Thiago Marinho", "tgmarinho@gmail.com")
    SELECT * FROM users WHERE email = "tgmarinho@gmail.com" LIMIT 1
#### Sequelize:

    User.create({ name: 'Diego Fernandes' , email: 'diego@rocketseat.com.br' , })
    User.findOne({ where: { email: 'tgmarinho@gmail.com' } })

### **No Sequelize temos também as Migrations:**

#### **Controle de versão para base de dados:**

Cada alteração na tabela como adição, remoção de campos ou criação de novas tabelas, é nas migrations que criamos a estrutura. É um controlador de versão mesmo, pode fazer rollback para desfazer alguma coisa, no banco de dados fica um registro de versão de cada migration que é executada.
Cada arquivo contém instruções para criação, alteração ou remoção de tabelas ou colunas;
Mantém a base atualizada entre todos desenvolvedores do time e também no ambiente de produção;
Cada arquivo é uma migration e sua ordenação ocorre por data;
Exemplo de Migration:

```javascript
module.exports = {
    up: (queryInterface, Sequelize) != {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            }
        })
    },
    down: (queryInterface, Sequelize) != {
        return queryInterface.dropTable('users')
    }
}
```
https://sequelize.org/master/manual/migrations.html

Obs:

- É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature;
- Depois que a migration foi enviada para outros devs ou para ambiente de produção ela JAMAIS poderá ser alterada, uma nova deve ser criada;
- Cada migration deve realizar alterações em apenas uma tabela, você pode criar várias migrations para alterações maiores;

#### Temos também os Seeds
População da base de dados para desenvolvimento:
- Podemos utilizar ele para gerar dados em tempo de execução do projeto, quando subimos o projeto ele cria dados fake.
• Muito utilizado para popular dados para testes;
• Executável apenas por código;
• Jamais será utilizado em produção;
- A ideia aqui é usar apenas os dados fake, para testar o fluxo do sistema e também performance de listas, etc, tem várias libs em JS que geram dados fake que pode ser usado nos Seeds.
• Caso sejam dados que precisam ir para produção, a própria migration pode manipular dados das tabelas;
- Os dados que vão para produção devem estar nas Migrations e não no Seed.

#### Arquitetura MVC
**Model, View, Controller é um arquitetura bem antiga e utilizado nos dias de hoje, onde:**

**M** = Model = Código da estrutura do banco de dados utilizando ORM ou não;
**V** = View = Código HTML, CSS, JS, JSX, código de criação e manipulação das telas do site/app;
**C** = Controller = Código JS, que contém a lógica do negócio, é o intermediário entre o Model e a View

**M <-> C <-> V**

A View faz a requisição, o Controller recebe, processa, chama o banco de dados(Model) o banco retorna para o Controller e repassa para a View a resposta, a qual é renderizada para o usuário.

###### Exemplo de um Controller:

```javascript
class UserController {
 index() { } //Listagem de usuários
 show() { } // Exibir um único usuário
 store() { } // Cadastrar usuário
 update() { } // Alterar usuário
 delete() { } // Remover usuário
}
```
Uma boa prática de criação de Controller, na estrutura REST e MVC em geral, é que o controller só pode ter os cinco métodos abaixo, ou menos, mais que isso não. Se sentir a necessidade de ter outro método, é porque na verdade você tem que criar um outro objeto, exemplo: **SessionController.js**, **LoginController.js.**

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula5


------------

# gobarber
## Aula 6 - Padrão de código - Eslint, Prettier & EditorConfig

Padrão de código é muito útil quando se está trabalhando com um time, pq cada um pode fazer as coisas de sua maneira e a base de código não vai ficar muito boa, tem desenvolvedor que vai usar var, outro const, e outro let, vai pular linha no final, outro não vai, vai usars export default, e outro não, e isso gera uma bagunça, e aí com isso temos algumas ferramentas que ajudam a definir as regras(padrão) de código e um estilizador de código utilizando as regras, e o mais adotado na comunidade JS, é o Eslint para definir as regras e o Prettier para formatar o código conforme as regras definidas no Eslint.

Mas o ESLINT tbm não tem qualquer regra, você pode usar algumas mais utilizadas no mercado, como as guias de estilos do [Airbnb](https://github.com/airbnb/javascript "Airbnb"), [Standard](https://standardjs.com/ "Standard") e outros, cada um tem suas características e estilos de escrita, ai vai do gosto de cada um, e do padrão que seu framework adota também, no caso Adonis utilizar o Stardard, então é sugestivo você usar o Standard para criar seu projeto seguindo esse estilo.

### Configurando o projeto
**Adicionando o eslint como dependências de desenvolvimento:**

```javascript
 yarn add eslint -D
```
**Feito isso só inicializar o eslint:**

```javascript
yarn eslint --init
```

Ele vai fazer algumas perguntas e você pode configurar conforme abaixo:

<!-- ESLINT INIT -->
<br />
<p align="center">
  <img src="https://github.com/diegovalemoreno/gobarber-backend/blob/aula6/images/Eslint_init.png" alt="ESLINT INIT">

  <h3 align="center">eslint init</h3>
</p>


E só seguir respondendo o Eslint. No final ele pede para instalar as dependências, só instalar e remover o package-lock.json e executar um yarn para atualizar as dependências, isso eu faço pq não estou usando o npm e sim o yarn como gerenciador de dependência e o eslint em baixo dos panos usa o npm para instalar.

No final ele cria um arquivo:** .eslintrc.js** com as seguintes configurações padrão:

```javascript
module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
```

###### OBS: Preciso ter o eslint nas extensões do VSCode.

E para o eslint corrigir automaticamente quando salva o arquivo, precisa ter nas settings.json do VSCode a seguinte configuração:
```javascript

  "eslint.autoFixOnSave": true,

  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
```

Pronto, agora já deve estar ok. Se o VSCode não estiver acusando erro de Eslint no arquivo app.js, pois com padrão Airbnb as aspas tem que ser simples, e deve ter ; no final de cada comando. Então fecha o vscode e abre novamente, ou tenta remover a nodemodules e instalar novamente: `rm -rf nodemodules/ yarn.lock && yarn`.

No .eslintrc.js, teremos uma definição de novas regras, é tipo como subscrever as regras padrão da guia de estilo airbnb no eslint, isso é necessário algumas vezes devido algum framework que iremos utilizar no dia a dia. .eslintrc.js:

```javascript
 rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
```
**Instalando o Prettier**
O Prettier melhora o código, deixando mais bonito, ele faz uma estilização a mais no código, além do que o eslint já faz.

 ```javascript
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```
e no .eslintrc.js preciso declarar:

```javascript
extends: ["airbnb-base", "prettier"],
plugins: ["prettier"],
 rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ['error', { argsIgnorePattern:  'next' }],
  }
```
Com isso o prettier está pronto para ser usado, porém, tem algumas regras de conflito entre o prettier e airbnb, então precisa de mais configuração, para desabilitar as configurações que o prettier sobrescreve do airbnb.

Criar o arquivo: **prettier.rc**:

```javascript
{
	"singleQuote":  true,
	"trailingComma":  "es5"
}
```
Defini a regra para manter aspas simples e deixar ; no final de cada instrução de código. Done!

Para corrigir todos os arquivos é só rodar:

```javascript
yarn eslint --fix src --ext .js
```
Legenda: --fix conserta tudo que está na pasta src que tenha a extensão(--ext) de arquivos .js.

###### Podemos colocar ela no package.json:

```javascript
 "scripts": {
    "dev": "nodemon src/server",
    "eslintify": "yarn eslint --fix src --ext .js"
  },
```
e rodar :
```javascript
yarn eslintify
```

Com isso, agora temos como manter o padrão de código na base de código da aplicação, se receber algum warn ou error, só ajustar conforme a sugestão do ESlint.

Mas e se os outros desenvolvedores não usam a IDE VSCode? Usam o Sublime, Vim, Atom ou WebStorm?

Ai entra o **EditorConfig**

Ele serve para que as regras definidas no Eslint e Prettier sejam aplicadas para todos as IDEs.

para isso basta criar um arquivo: **.editorConfig** na raiz do projeto com as configurações:

```javascript
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula6

------------

# gobarber
## Aula 7 - Configurando o Sequelize

- Criar estrutura de pastas, dentro da src
- Adicionar a dependência: yarn add sequelize no projeto
- Adicionar a interface de linha de comando do sequelize: yarn add sequelize-cli -D
- Criar o arquivo **.sequelizerc** na raiz do projeto para poder configurar os caminhos para as pastas de models, config, para rodar os comandos sequelize-cli:

```javascript
const { resolve } = require('path');

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
};
```

#### Configurando o database:

adiciono as dependencias:
`yarn add pg pg-hstore`

no arquivo **config/database.js**:

    module.exports = {
      dialect: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'docker',
      database: 'gobarber',
      define: {
        timestamps: true, // garante que será criado um atributo: created_at e updated_at na tabela do banco de dados.
        underscored: true, // permite o ORM criar nome de tabelas como products_item
        underscoredAll: true, // permite o ORM criar nome dos atributos com caixa baixa e _ em vez de camelCase, pois esse é a convenção de escrita no banco de dados
      },
    };

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula7

------------

# gobarber
## Aula 8 - Migração de usuário

**Para criar as migrations basta rodar comando:**

`yarn sequelize migration:create --name=create-users `

Com isso ele vai criar um arquivo:

**20190913144153-create-users.js**

Com um template:

```javascript
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
```

**Método up quando a migration é executada e método down para fazer um rollback.**

**Migration de Usuário**

```javascript

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
```

###### Para rodar a migration:

`❯ yarn sequelize db:migrate`


###### E ai podemos ver o DDL lá na GUI do Postgres:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    provider boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX users_pkey ON users(id int4_ops);
CREATE UNIQUE INDEX users_email_key ON users(email text_ops);
```

Além da tabela users, é criada uma tabela SequelizeMeta que tem os registros de cada migration que foram executadas.

Para desfazer as migrations:

`yarn sequelize db:migrate:undo   `

Com isso a tabela users não existirá mais.

Desfazer tudo, com isso desfazer todas as migrations que foram executadas e não apenas a última.

`yarn sequelize db:migrate:undoAll      `

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula8

------------

