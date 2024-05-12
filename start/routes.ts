/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.group(() => {
  router.post('/register', [AuthController, 'register']);
  router.post('/login', [AuthController, 'login']);
}).prefix('api/6iphermail')

router.get('/me',[AuthController,'me']).middleware(middleware.auth())