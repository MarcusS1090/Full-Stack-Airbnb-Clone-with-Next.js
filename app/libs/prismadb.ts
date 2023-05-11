import { PrismaClient } from "@prisma/client";

/*
    aqui importamos nuestro PrismaClient de forma global par poder trabajarlo a lo largo del codigo
*/
declare global {
    var prisma: PrismaClient | undefined
}

/*
aqui creamos una constante cliente para que nos muestre prisma de manera global
o que nos cree un nuevo PrismaClient 
*/
const client = globalThis.prisma || new PrismaClient()
//esta condicion nos sirve para ver que no estemos en produccion
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;