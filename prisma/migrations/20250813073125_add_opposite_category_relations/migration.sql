/*
  Warnings:

  - You are about to drop the column `categoryArticlesId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `categoryPostsId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_categoryArticlesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_categoryPostsId_fkey";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "categoryArticlesId",
DROP COLUMN "categoryPostsId",
ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
