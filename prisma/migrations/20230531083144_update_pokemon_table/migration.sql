/*
  Warnings:

  - You are about to drop the `_PokemonToTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PokemonToTeam" DROP CONSTRAINT "_PokemonToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_PokemonToTeam" DROP CONSTRAINT "_PokemonToTeam_B_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "teamId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PokemonToTeam";

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
