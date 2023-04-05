'use client';

//en este componente arreglaremos un pequeño bug no muy commun que aparece
//cuando refrescamos la pagina y clickeamos en cualquier parte
import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

  //aqui retornamos null si nuestra aplicacion no ha sido montada
    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    );
};

export default ClientOnly;