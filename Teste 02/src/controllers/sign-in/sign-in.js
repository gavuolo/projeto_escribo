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
    if(error.name === "InvalidUser"){
      return res.status(httpStatus.UNAUTHORIZED).send(error.message)
    }
    return res.status(httpStatus.UNAUTHORIZED).send(error)
  }
}

export async function getSignIn(req, res, next){
  const { userId } = req
  console.log("ID DO USUÁRIO QUE VEM DA REQUISIÇÃO",userId)
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
    next(error)
  }
}