import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import  prisma  from "@/app/libs/prismadb";


//funcion para optener la sesion
export async function getSession() {
    return await getServerSession(authOptions);
}

//nuestra funcion para getcurrentuser
//esto es una comunicasion directa con nuestra base de datos


export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null; 
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });
        if (!currentUser) {
            return null;
            
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error: any) {
        return null;
    }
}

