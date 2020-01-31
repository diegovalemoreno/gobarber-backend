import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego Moreno',
    email: 'diegovalemoreno@gmail.com',
    password_hash: '1232131',
  });
  return res.json(user);
});


module.exports = routes;
