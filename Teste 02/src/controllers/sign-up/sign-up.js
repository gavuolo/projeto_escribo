import httpStatus from "http-status";
import { createUser } from "../../services/user-service.js";

export async function userPost(req, res, next) {
  const { email, senha, nome } = req.body;
  const telefones = req.body.telefones
  try {

    const user = await createUser({
      email,
      senha,
      nome,
      telefones, 
    });
    console.log(user)
    return res.status(httpStatus.CREATED).send({
      "id": user.user.id,
      "data_criacao": user.user.createdAt,
      "data_atualizacao": user.user.updatedAt,
      "ultimo_login": user.token.createdAt,     
      "token": user.token.token
    });
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.CONFLICT).send(error);
  }
}
