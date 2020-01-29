
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

    docker  start postgres 
Pode ser o ID ou o nome do container.

###### Para ver os logs do container:

    docker logs postgres
	

O mesmo container pode ser usado para outras aplicações, mas tem como fazer um container apenas para a aplicação.

###### Para remover um container:

    docker rm "ID ou nome do container"

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula4
