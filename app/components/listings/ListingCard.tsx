'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListings } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: safeListings;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> =({ 
    data,
    reservation,
    onAction,
    disabled,
    actionId="",
    actionLabel,
    currentUser
}) => {
    //almacenamos los hooks en constantes
    const router = useRouter();
    const { getByValue } = useCountries();

    //para guardar la location value en la base de datos
    const location = getByValue(data.locationValue);

    //con esta variable hace dos eventos, parar las listas cuando en el mouse 
    //detecte cancelar y si no ver el Id de la pagina.
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onAction?.(actionId);
        }, [onAction, disabled, actionId]);

        //con esto mostraremos el precio cuando reservemos
        const price = useMemo(() => {
            if (reservation) {
                return reservation.totalPrice;
            }
            return data.price;
        },[reservation, data.price]);

        //aqui le vamos a pedir que nos de la fecha de la reservacion
        const reservationDate = useMemo(() => {
            if (!reservation) {
                return null;
            }

            //estas variables para almacenar el inicio y el final de la fecha
            //de reservacion
            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            //esta es la forma para retornar nuestras fechas
            return `${format(start, 'PP')} - ${format(end, 'PP')}`
        },[reservation]);
    return (
        <div
            onClick={() =>router.push(`/listings/${data.id}`)}
            className="
                col-span-1 cursor-pointer group
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image 
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard;