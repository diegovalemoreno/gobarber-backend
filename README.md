## Aula 12 - Enviando password_hash

Quando o usuário digita a senha e envia para o controllers, queremos que seja gerado um hash para salvar a senha no banco de dados, e posteriormente quando ele for fazer login, ele digita a senha normal, e geramos um hash e comparamos com o hash que foi salvo no password_hash do banco de dados, se for igual, ok, está autenticado.

Para fazer isso precisamos de uma lib para gerar o hash do password:

    yarn add bcryptjs

**Bcryptjs** é utilizado no model de User, criamos um campo virtual, que é utilizado para receber o password do frontend e que é feito o hasg para através da lib bcrypt para a variável password_hash que essa sim é uma String que é salva no banco de dados.

A model **user.js** ficará assim:

```javascript
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if(user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
      return this;
    })
  }
}

export default User;

```

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula12

