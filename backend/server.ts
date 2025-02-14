import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes";
import tasksRoutes from "./routes/tasksRoutes";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuários e Tarefas",
      version: "1.0.0",
      description: "Documentação da API de usuários e tarefas utilizando Swagger",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/user", userRoutes);
app.use("/tasks", tasksRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});

export default app;
