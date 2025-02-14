import userServices from "../services/userServices";
import { Request, Response } from "express";

const userController = {
  createUser: async (req: Request, res: Response) => {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await userServices.createUser(newUser);

    if ("error" in response) return res.status(400).json(response.error);

    res.status(201).json(response);
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await userServices.getUserByEmail(email);

      if (!user || "error" in user) {
        return res.status(401).json({ message: "Email incorreto" });
      }

      const samePassword = password === user.password;

      if (samePassword) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Senha incorreta" });
      }
    } catch (error) {
      res.status(500).json({ message: "Falha ao logar", error: error.message });
    }
  },
};

export default userController;
