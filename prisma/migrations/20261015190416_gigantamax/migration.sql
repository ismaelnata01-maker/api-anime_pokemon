/*
  Warnings:

  - You are about to drop the column `pokemonPrincipal` on the `personagens` table. All the data in the column will be lost.
  - Added the required column `pokemon_principal` to the `personagens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_personagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pokemon_principal" TEXT NOT NULL,
    "mega_evolucao" TEXT,
    "gigantamax" TEXT
);
INSERT INTO "new_personagens" ("id", "nome") SELECT "id", "nome" FROM "personagens";
DROP TABLE "personagens";
ALTER TABLE "new_personagens" RENAME TO "personagens";
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_usuarios" ("cpf", "email", "id", "senha") SELECT "cpf", "email", "id", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
