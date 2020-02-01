## Aula 11 - Criando loader de Models

- Criar controller de Usuário

```javascript
    import User from '../models/User';
    class UserController {
      async store(req, res) {
        const userExists = await User.findOne({ where: { email: req.body.email } });
        if (userExists) {
          return res.status(400).json({ error: 'User already exists.' });
        }
        const { id, name, email, provider } = await User.create(req.body);
        return res.json({ id, name, email, provider });
      }
    }

   export default new UserController();
```

- Criar a rota de users para receber a requisição e passar o UserController.store para que seja executado quando a rota for chamada.

```javascript
import UserController from './app/controllers/UserController';
...
routes.post('/users', UserController.store);
...
```

- Validar se já existe o usuário, pois o email é um campo único na base de dados (validação no backend é importante)

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula11

