export default function duplicatedEmailError() {
    return {
      name: 'DuplicatedEmailError',
      message: 'Já existe um usuário cadastrado com este e-mail',
    };
  }
  