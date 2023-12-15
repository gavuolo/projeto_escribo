import { Router } from 'express';
import { signIn } from '../controllers/sign-in/sign-in.js';
import authenticateToken from '../middlewares/authentication-middleware.js'

const loginRouter = Router();

loginRouter.post('/',  signIn)
loginRouter.get('/', authenticateToken, signIn)
export { loginRouter };