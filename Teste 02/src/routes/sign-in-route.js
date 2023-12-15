import { Router } from 'express';
import { signIn } from '../controllers/sign-in/sign-in.js';


const loginRouter = Router();

loginRouter.post('/', signIn)
export { loginRouter };