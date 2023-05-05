import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function DELETE(
    request: Request,
    { params } : { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    //con esto nos hacemos cargo de que las unicas personas que pueden hacer una reservacion
    //crear una reservacion o crear un listing pueda borrar el listing,reservacion o airbnb 
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: {userId:currentUser.id}}
            ]
        }
    })

    return NextResponse.json(reservation);
}