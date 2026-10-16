import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

async function main() {
    const usuario = await prisma.usuarios.create({
        data:{
            nome: "Admin",
            email: "a@gmail.com",
            cpf:"12345678912",
            senha: bcrypt.hashSync("1234", +process.env.BCRYPT_ROUNDS!),
        },
    });

    console.info("Usuario criado", usuario);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });