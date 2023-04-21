'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC <CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        //vamos a checar si tenemos params o esta en null
        /*
        lo que estamos haciendo con esta condicion, es creando un objeto fuera de todo
        nuestros current parameters en el futuro vamos a tener muchos parametros, cosas
        en nuestro URL incluyendo, la localizacion, fecha de inicio y de finalizacion
        cuando vamos a ir a vacaciones, el numero de invitados, el numero de cuartos y todo eso
        por eso tenemos que asegurarnos que clickeando alguna de estas categorias que por accidente
        no removamos estos parametros que queremos que siempre esten activos que combina todo los demas
        parametros
        */
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        /*
        cuando clickeemos en alguna de nuestras categorias el current label sera asignado a
        nuestro category param en nuestra URL
        */
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        /*
        aqui vamos a checar si por si acaso tenemos seleccionado una categoria, entonces cuando de 
        click de nuevo en la categoria quiero remover las demas categorias, asi que aqui vamos a tener
        una forma para resetear las categorias una vez seleccionada.
        */
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
        /*
        aqui vamos a generar nuestro url string usando stringify URL, donde le pasamos nuestro path name
        el cual siempre va a ser un '/' para pasarle el nuevo query que hemos manipulado en router.push
        */
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});
        router.push(url);
    }, [label,params,router]);
    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon size={26}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;