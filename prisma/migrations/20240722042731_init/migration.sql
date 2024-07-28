-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- CreateTable
CREATE TABLE "Cliente" (
    "clientid" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "genero" "Gender" NOT NULL,
    "edad" INTEGER NOT NULL,
    "identificacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "contrasena" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("clientid")
);
