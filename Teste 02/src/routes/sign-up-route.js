import { Router } from 'express';
import { userPost } from '../controllers/sign-up/sign-up.js';



const signUpRouter = Router();

signUpRouter.post('', userPost)

export { signUpRouter };