import { Listing, User } from "@prisma/client";

//fix para error en el servidor
export type safeListings = Omit<
    Listing,
    "createdAt"
> &{
    createdAt: string;
} 

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};