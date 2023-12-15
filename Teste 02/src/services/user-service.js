
import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken';

export async function createUser({ email, senha, nome, telefones }) {
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


export default { createUser };
