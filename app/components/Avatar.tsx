//definir siempre com un componente de uso cliente, para poder usarlo desde el front
'use client'

import Image from "next/image";
const Avatar = () => {
    return(
        <Image
            className="rounded-full"
            height={30}
            width={30}
            alt="Avatar"
            src="/images/placeholder.jpg"
        />
    )
}

export default Avatar;