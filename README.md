## Aula 10 - Criando loader de Models

Para conectar a aplicação com banco de dados  e carregar os models, temos que criar um o arquivo index.js na pasta database.
```
import Sequelize from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
```

Quando esse arquivo é importando, ele recebe uma instância do Database, que chama a função init, que instancia para o this.connection a Sequelize com as configurações de conexão com banco de dados. E para cada model que eu importei eu passo a conexão.

#####  Não esquecer de criar import dentro do arquivo App.js para o arquivo index.js que exporta o modulo Database.

```
import './database';
```

------------

```
// Quando chamo a rota '/', cadastro o usuário e retorno os dados do banco de dados
// http://localhost:3333/

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego Moreno',
    email: 'diegovalemoreno@gmail.com',
    password_hash: '1232131',
  });
  return res.json(user);
});

```

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula10
