/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `pokedexNumber` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
ADD COLUMN     "pokedexNumber" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "baseExperience" DROP NOT NULL,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id");
