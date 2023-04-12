//aqui vamos a poner nuestra configuracion de nextauth

import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    //aqui vamos a hacer un array para nuestros providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' }
            },
            //si el usuario olvida su email o su contraseña entonces le saldra un
            //error de que esta teniendo algun error en una de esta
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                throw new Error('Invalid credentials');
                }
                // aqui mientras esperamos una authentificacion esperamos el usuario
                // entonces en esta seccion le decimos que encuentre el usuario unico
                // en este caso son las credenciales del email
                const user = await prisma.user.findUnique({
                    where: {
                    email: credentials.email
                    }
                });
                // si el usuario no puede ser encontrado entonces hacemos una condicional
                // si no hay usuario y si la contraseña no  coincide con el usuario entonces
                // le pasamos un error
                if (!user || !user?.hashedPassword) {
                    throw new Error('Usuario Invalido');
                }

                // si la contraseña es correcta entonces 
                // va a comprar las credenciales.password con el user.hasedPassword
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                //aqui hacemos un pequeño condicional si la contraseña es incorrecta
                if(!isCorrectPassword) {
                    throw new Error('Contraseña incorrecta');
                }

                return user;
            }
        })
    ],
    // cuando cualquier error pase o si usamos algun callback sospechoso,
    // nos va a reedirigir a nuestra pagina principal
    pages: {
        signIn: '/',
    },
    // con esto nos aseguramos que para hacer debug debamos estar en desarrollador
    // para ver errores
    debug: process.env.NODE_ENV === 'development' ,
    //
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 