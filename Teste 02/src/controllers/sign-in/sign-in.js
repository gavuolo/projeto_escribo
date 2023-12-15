import httpStatus from "http-status";
import { sessionPost } from "../../services/user-service.js";

export async function signIn(req, res, next) {
  const { email, senha } = req.body

  try{
    const login = await sessionPost(email, senha)
    return res.status(httpStatus.OK).send({
      "id": login.id,
      "data_criacao": login.token.createdAt,
      "data_atualizacao": login.token.createdAt,
      "ultimo_login": login.token.createdAt,
      "token": login.token.token

    })
  }catch(error){
    return res.status(httpStatus.UNAUTHORIZED).send(error.message)
  }
}

export async function getSignIn(req, res, next){
  const { userId } = req
  console.log(userId)
  try{
    const info = await getUser(userId)
    return res.status(httpStatus.OK).send({
      "id": info.id,
      "data_criacao": info.createdAt,
      "data_atualizacao": login.token.createdAt,
      "ultimo_login":info.updatedAt,
      "token": info.token,
    })
  }catch(error){
    console.log(error)
    next(error)
  }
}