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
import { loginUser } from "@/services/userServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("user", JSON.stringify(response));
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso.",
      });
      toast({
        title: "Bem-vindo!",
        description: `Bem-vindo, ${response.name}!`,
      });
      setTimeout(() => {
        router.push("/home");
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
        marginTop: "13%",
      }}
    >
      <Card className="w-96 h-auto mx-auto p-4 shadow-lg bg-gray-800 text-white border-2 border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogin}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Entrar
          </Button>
        </CardFooter>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Não possui conta? 
          <a
            href="/register"
            className="ml-1 hover:bg-gray-200 hover:text-black transition p-1 duration-200 ease-in-out rounded"
          >
            Registre-se
          </a>
        </p>
      </Card>
    </div>
  );
}
