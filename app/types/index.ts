import { Listing, Reservation, User } from "@prisma/client";

//fix para error en el servidor
export type SafeListings = Omit<
    Listing,
    "createdAt"
> &{
    createdAt: string;
} 
export type SafeReservations = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListings;
}
export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};