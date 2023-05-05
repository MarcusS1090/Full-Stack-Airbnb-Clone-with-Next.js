import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";


const PropertiesPages = async () => {
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
    const listings = await getListings({
        userId: currentUser.id
    });
    //2.1) si reservations es null entonces hara lo siguiente:
    if (listings.length === 0 ) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No properties found"
                    subtitle="looks like you have no properties"
                />
            </ClientOnly>
        )
    }
    //3)si current user es true y reservations es diferente de cero motrara lo siguiente:
    return(
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPages;