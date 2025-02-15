"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/userServices";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
  const arePasswordsValid = () => password === passwordConfirmation;

  const handleRegister = async () => {
    if (!isEmailValid(email)) {
      toast({
        title: "Erro!",
        description: "Email inválido",
      });
      return;
    }

    if (!arePasswordsValid()) {
      toast({
        title: "Erro!",
        description: "Senhas não coincidem",
      });
      return;
    }

    try {
      const response = await registerUser(name, email, password);
      localStorage.setItem("user", JSON.stringify(response));
      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso.",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      toast({
        title: "Erro!",
        description: errorMessage,
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Card className="w-96 h-auto mx-auto p-4 shadow-lg bg-gray-800 text-white border-2 border-white/20">
        <CardHeader>
          <CardTitle>Cadastre-se</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleRegister}
            className="w-full bg-white text-black hover:bg-gray-300"
          >
            Cadastrar
          </Button>
        </CardFooter>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Já possui conta?
          <a
            href="/"
            className=" ml-1 p-1 hover:bg-gray-200 hover:text-gray-900 transition  duration-200 ease-in-out rounded"
          >
            Login
          </a>
        </p>
      </Card>
    </div>
  );
}
