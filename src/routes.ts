import { Router } from "express";
import personagensController from "./controllers/personagens";
import usuariosController from "./controllers/usuarios";

//Inicializa o router
const routes = Router();

//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello World!" });
});

//Rotas de personagens
routes.get("/personagens", personagensController.list);
routes.get("/personagens/:id", personagensController.getById);
routes.post("/personagens", personagensController.create);
routes.put("/personagens/:id", personagensController.update);
routes.delete("/personagens/:id", personagensController.delete);

//Rotas de usuarios
routes.post("/login", usuariosController.login)

export default routes;