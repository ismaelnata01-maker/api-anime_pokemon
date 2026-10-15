import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";


export default {
login: async (request: Request, response: Response) => {
        try {
            const { nome, email, cpf, senha } = request.body;

            if(!nome || !email || !cpf || !senha){
                return response.status(400).json("Dados incompletos");
            }

            const usuarios = await prisma.usuarios.findUnique({
                where: {
                email,
                },
            });

            if (!usuarios || !bcrypt.compareSync(senha, usuarios.senha)) {
                return response.status(404).json("Nome, email, cpf e/ou senha inválidos");
            }

            const token = jwt.sign(
                { id: usuarios.id},
                process.env.JWT_SECRET!,
                {
                    expiresIn: "1d",
                },
            );

            return response.status(200).json(token)
        } catch (e) {
            return handleErrors(e, response);
        }
    }
}