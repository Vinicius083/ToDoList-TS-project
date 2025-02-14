import { PrismaClient } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();

interface User {
  name: string;
  email: string;
  password: string;
}

const userServices = {
  createUser: async (newUser: User) => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return { error: "Envie todos os campos obrigatórios" };
    }

    if (!validator.isEmail(newUser.email)) return { error: "E-mail inválido" };

    if (
      newUser.password.length < 8 ||
      !validator.isStrongPassword(newUser.password, {
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return {
        error:
          "A senha deve conter pelo menos 8 caracteres, incluindo ao menos uma letra maiúscula, uma letra minúscula e um número.",
      };
    }

    const emailExists = await prisma.user.findFirst({
      where: { email: newUser.email },
    });
    if (emailExists) return { error: "E-mail já cadastrado" };

    try {
      const response = await prisma.user.create({ data: newUser });
      return response;
    } catch (error) {
      return { error: "Erro ao inserir usuário no banco" };
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) return null;

      return user;
    } catch (error) {
      return { error: "Erro ao buscar usuário no banco" };
    }
  },
};

export default userServices;
