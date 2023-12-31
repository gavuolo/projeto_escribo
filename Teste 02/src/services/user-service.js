
import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken';
import duplicatedEmailError from "../errors/duplicate-email-error.js";
import invalidUser from "../errors/ivalid-user-error.js";

export async function createUser({ email, senha, nome, telefones }) {
  const validateEmail = await findEmail(email)
  if(validateEmail){
    throw duplicatedEmailError()
  }
  const hashedPassword = await bcrypt.hash(senha, 12);
  const user = await userRepository.create(email, hashedPassword, nome, telefones);
 
  const token = await createToken(user)
  return {user, token};
}
async function createToken(user){
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
  const session = await userRepository.createSession(token, user.id)
  return token, session
}
export async function sessionPost(email, senha){
  const user = await findEmail(email)
  if(!user){
    throw invalidUser()
  }
  await validatePassword(senha, user.senha)
  const token = await createToken(user)    
  const response = {
      id: user.id,
      email: user.email,
      token
  }
  return response
}
async function findEmail(email){
  const emailExist = await userRepository.findEmail(email);
  return emailExist
}

async function validatePassword(senha, userSenha){
  const passwordValidation = await bcrypt.compare(senha, userSenha)
  if(!passwordValidation){
     throw invalidUser()
  }
}

async function getUser(userId){
  const user = await userRepository.findUserById(userId)
  return user
}

export default { createUser, sessionPost , getUser};
