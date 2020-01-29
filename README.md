
# gobarber
<<<<<<< HEAD
##Aula 5 - Sequelize & MVC

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
=======
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

>>>>>>> 581d4dd6ecb45115e202542d57c84091a220b819

Obs:

- É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature;
- Depois que a migration foi enviada para outros devs ou para ambiente de produção ela JAMAIS poderá ser alterada, uma nova deve ser criada;
- Cada migration deve realizar alterações em apenas uma tabela, você pode criar várias migrations para alterações maiores;

<<<<<<< HEAD
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
=======
###### Para subir o container:
    ❯ docker  start postgres 
Pode ser o ID ou o nome do container.
>>>>>>> 581d4dd6ecb45115e202542d57c84091a220b819

**M** = Model = Código da estrutura do banco de dados utilizando ORM ou não; 
**V** = View = Código HTML, CSS, JS, JSX, código de criação e manipulação das telas do site/app; 
**C** = Controller = Código JS, que contém a lógica do negócio, é o intermediário entre o Model e a View

<<<<<<< HEAD
**M <-> C <-> V**
=======
    ❯ docker logs postgres
	
>>>>>>> 581d4dd6ecb45115e202542d57c84091a220b819

A View faz a requisição, o Controller recebe, processa, chama o banco de dados(Model) o banco retorna para o Controller e repassa para a View a resposta, a qual é renderizada para o usuário.

###### Exemplo de um Controller:

<<<<<<< HEAD
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
=======
    ❯ docker rm "ID ou nome do container"
>>>>>>> 581d4dd6ecb45115e202542d57c84091a220b819

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula5