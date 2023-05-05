import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";

import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";


const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    //las siguientes condicionales son para comprobar el estado de currentUser
    //1)si no hay current user haremos lo siguiente:
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    //2) si currentUser es true y tiene un id entonces pasara a la siguiente condicion
    const reservations = await getReservations({
        userId: currentUser.id
    });
    //2.1) si reservations es null entonces hara lo siguiente:
    if (reservations.length === 0 ) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips found"
                    subtitle="looks like you haven't reserved any trips"
                />
            </ClientOnly>
        )
    }
    //3)si current user es true y reservations es diferente de cero motrara lo siguiente:
    return(
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;