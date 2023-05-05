import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try{
        //con estos parametros vamos a crear un query dependiendo las condiciones
        const { listingId, userId, authorId} = params;

        const query: any = {};

        //vamos a encontrar todas las reservaciones para un solo airbnb dependiendo su ID
        if (listingId) {
            query.listingId = listingId;
        }
        //vamos a encontrar todas las reservaciones que ha hecho un usuario dependiendo de su ID
        if (userId) {
            query.userId = userId;
        }
        //vamos a encontrar todas las reservaciones que todos los usuarios han hecho
        //para ese airbnb (listing)
        if (authorId) {
            query.listing = { userId: authorId }
        }

        //vamos a hacer la peticion fetch
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        //sanitizamos los objetos de la fecha para no tener algun error
        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString()
                }
            })
        );

        return safeReservations;
    } catch(error: any) {
        throw new Error(error);
    }
}