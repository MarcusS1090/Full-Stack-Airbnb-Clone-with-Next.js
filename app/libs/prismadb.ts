//aqui vamos a tener las funciones de prismadb
import { PrismaClient } from "@prisma/client"

//aqui importamos el cliente de prisma y le damos una definicion global de prisma
//asi puede trabajar a lo largo de nuestro codigo
declare global {
    var prisma: PrismaClient | undefined
}

// esto hace una busqueda global en globalThis o puede crear un nuevo cliente global
// luego creamos un condicional if para checar si no estamos en modo produccion
//  si NODE.ENV no esta en produccion entonces pones el cliente global de prisma  
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client