import prisma from "../config/database.js";

async function create(email, senha, nome, telefones) {
  return await prisma.users.create({
    data: {
      email,
      senha,
      nome,
      telefones,
    },
  });
}
async function createSession(token, userId){
  return prisma.session.create({
    data: {
      token, userId
    }
  })
}

const userRepository = {
  create,
  createSession,
};

export default userRepository;
