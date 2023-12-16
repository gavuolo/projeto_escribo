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
    return res.status(httpStatus.CREATED).json({
      "id": user.user.id,
      "data_criacao": user.user.createdAt,
      "data_atualizacao": user.user.updatedAt,
      "ultimo_login": user.token.createdAt,     
      "token": user.token.token
    });
  } catch (error) {
    if(error.name === 'DuplicatedEmailError'){
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.CONFLICT).send(error);
  }
}
