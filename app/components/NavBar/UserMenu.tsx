//en esta seccion vamos a poner el menu del usuario
'use client';

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from "../Avatar";
import React, { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

import userRegisterModal from '@/app/hooks/userRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from "@prisma/client";
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    //con esto nostraemos desde hooks nuestro registerModal y sus funciones
    const registerModal = userRegisterModal();
    const loginModal = useLoginModal();

    //vamos a usar una funcion para usar algunos estados para la barra de usuario,para saber si se abre o no
    const [isOpen, setIsOpen] = useState(false);

    //aqui usamos una funcion para que nos retorne el valor de que esta abierto
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-natural-100
                        transition
                        cursor-pointer
                    "
                >
                    pon tu espacio en Airbnb 
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px] 
                        border-neutral-200 
                        flex 
                        flex-row 
                        items-center 
                        gap-3 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => {}}
                                    label='Mis Viajes'
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label='Mis Favoritos'
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label='Mis Reservaciones'
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label='Mis Propiedades'
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label='mi Hogar Airbnb'
                                />
                                <hr />
                                <MenuItem 
                                    onClick={() => signOut}
                                    label='Salir'
                                />                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label='Iniciar sesion'
                                />
                                <MenuItem 
                                    onClick={registerModal.onOpen}
                                    label='Registrate'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;