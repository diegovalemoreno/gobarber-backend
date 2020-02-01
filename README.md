## Aula 14 - Autenticação JWT
Vamos usar a lib jsonwebtoken:

    yarn add jsonwebtoken

Para criar a autenticação do usuário, podemos criar um controller: SessionController.js que serve para tratar a autenticação e não a criação de usuário.

Para gerar string aleatória (secret). https://www.md5online.org/

1 - Criação do arquivo SessionController.js

```javascript
import jwt from 'jsonwebtoken';
 import authConf from '../../config/auth';
 import User from '../models/User';

 class SessionController {
   async store(req, res) {
     const { email, password } = req.body;

     const user = await User.findOne({ where: { email } });
     if (!user) {
       return res.status(401).json({ error: 'User not found' });
     }

     if (!(await user.checkPassword(password))) {
       return res.status(401).json({ error: 'Password does not match!' });
     }

     const { id, name } = user;

     return res.json({
       user: {
         id,
         name,
         email,
       },
       token: jwt.sign({ id }, authConf.secret, {
         expiresIn: authConf.expireIn,
       }),
     });
   }
 }

 export default new SessionController();

```


2 - Criação do método **checkPassword** no arquivo src/app/models/User.js
```javascript
   checkPassword(password) {
     return bcrypt.compare(password, this.password_hash);
   }
 }
```

 3 - Criação do arquivo **src/config/auth.js **

```javascript
export default {
   secret: '05e0ea4d9eb268341c165403f7da95e1',
   expireIn: '7d',
 };
```
4 - Alteração no arquivo  **src/routes.js**:

```javascript
import { Router } from 'express';
 import UserController from './app/controllers/UserController';
 import SessionController from './app/controllers/SessionController';

 const routes = new Router();

 routes.post('/users', UserController.store);
 routes.post('/sessions', SessionController.store);

 export default routes;
```
Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula14

