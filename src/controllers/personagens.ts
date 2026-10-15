import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default{
     list: async ( request: Request, response: Response ) => {
        try {
            const personagens = await prisma.personagens.findMany({
                
            });

            return response.status(200).json(personagens);
        } catch(e) {
            return handleErrors(e, response);
        }
    },

    getById: async(request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const perssonagens = await prisma.personagens.findUnique({
                where: { 
                    id: +id,
                 },
                 
            })
            
            return response.status(200).json(perssonagens);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async(request: Request, response: Response) => {
        try {
            const { nome, pokemon_principal, mega_evolucao, gigantamax } = request.body;

            if(!nome || !pokemon_principal){
                return response.status(400).json("Dados do personagem incompletos")
            }

            const personagens = await prisma.personagens.create({
                data: {
                    nome,
                    pokemon_principal,
                    mega_evolucao,
                    gigantamax,
                },
            }); 
            return response.status(201).json(personagens);

        } catch (e) {
            return handleErrors(e, response); 
        }
    },

    update: async(request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, pokemon_principal, mega_evolucao, gigantamax } = request.body;

            const personagens = await prisma.personagens.update({
                where: {
                    id: +id,
                },
                data: {
                    nome,
                    pokemon_principal,
                    mega_evolucao,
                    gigantamax,
                },
            });

            return response.status(200).json(personagens);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const personagens = await prisma.personagens.delete({
                where: {
                    id: +id,

                },
            });

            return response.status(200).json(personagens)
        } catch (e){ 
            return handleErrors(e, response);
        }
    }
};