import prisma from "../config/database.js";

async function create(email, senha, nome, telefones) {
console.log(telefones)
  return await prisma.users.create({
    data: {
      email,
      senha,
      nome,
      telefones,
    },
  });
}
async function createSession(token, userId) {
  return prisma.session.create({
    data: {
      token,
      userId,
    },
  });
}
async function findEmail(email) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}
async function findUserById(userId) {
  return prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}
const userRepository = {
  create,
  createSession,
  findEmail,
  findUserById,
};

export default userRepository;
