'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io"
import Button from "../Button";

//vamos a crear una interface para modal 
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
        isOpen,
        onClose,
        onSubmit,
        title,
        body,
        footer,
        actionLabel,
        disabled,
        secondaryAction,
        secondaryActionLabel
    }) => {
    //vamos a usar algunos estados para usar en nuestro modal
    /*
    en esta funcion vamos a poner todas nuestras propiedades de la interfaz
    para poder ver y usar la pestaña de modals, 
    */
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() =>{
        setShowModal(isOpen);
    }, [isOpen]);

    /*
    vamos a verificar si model esta desactivado solo va a romper la funcion
    y no va a dejar que nada pase cuando le demos al boton de cerrar, de otra
    manera vamos a iniciar de manera local nuestro modal a falso.
    vamos a poner un timeOut de 3ms donde se cerrara,esto hara un delay para
    a la hora de cerrar el modal y tendremos una animacion de abrir y cerrar
    el modal
    */
    const handleClose = useCallback(() => {
        if (disabled) {
            return; 
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        },300)
    }, [disabled, onClose]);

    /*
     este callback lo que hara es: tambien revisara que el modal este desconectado
     en ese caso va romper la funcion,sino vamos a llamar onSubmit
    */
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    },[disabled,onSubmit]);

    /*
    vamos a hacer una funcion para nuestras acciones secundarias, que sera como
    un boton anterior o siguiente.

    Vamos a checar si nuestra esta desactivada o si no tenemos una accion secundaria

    */

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    //aqui solo vamos a poner una condicional que si no esta abierto,que no retorne nada
    
    if (!isOpen) {
        return null;
    }

    return(
        <div>
            <>
                <div
                    className="
                        justify-center
                        items-center
                        flex
                        overflow-x-hidden
                        overflow-y-auto
                        fixed
                        inset-0
                        z-50
                        outline-none
                        focus:outline-none
                        bg-neutral-800/70 
                    "
                >
                    <div
                        className="
                            relative
                            w-full
                            md:w-4/6
                            lg:w-3/6
                            xl:w-2/5
                            my-6
                            mx-auto
                            h-full
                            lg:h-auto
                            md:h-auto
                        "
                    >
                        {/**Content */}
                        <div
                            className={`
                                translate
                                duration-300
                                h-full
                                ${showModal ? 'translate-y-0' : 'translate-y-full'}
                                ${showModal ? 'opacity-100' : 'opacity-0'}
                            `}
                        >
                            <div
                                className="
                                    translate
                                    h-full
                                    lg:h-auto
                                    md:h-auto
                                    border-0
                                    rounded-lg
                                    shadow-lg
                                    relative
                                    flex
                                    flex-col
                                    w-full
                                    bg-white
                                    outline-none
                                    focus:outline-none
                                "
                            >
                                {/* HEADER */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        p-6
                                        rounded-t
                                        justify-center
                                        relative
                                        border-b-[1px]
                                    "
                                >
                                    <button
                                        onClick={handleClose}
                                        className="
                                            p-1
                                            border-0
                                            hover:opacity-70
                                            transition
                                            absolute
                                            left-9
                                        "
                                    >
                                        <IoMdClose size={18} />
                                    </button>
                                    <div className="text-lg font-semibold">
                                        {title}
                                    </div>
                                </div>
                                {/*BODY */}
                                <div className="relative p-6 flex-auto">
                                    {body}
                                </div>
                                {/* FOOTER */}
                                <div className="flex flex-col gap-2 p-6">
                                    <div
                                        className="
                                            flex
                                            flex-row
                                            items-center
                                            gap-4
                                            w-full
                                        "
                                    >
                                        {secondaryAction && secondaryActionLabel && (
                                            <Button
                                                outline
                                                disabled={disabled}
                                                label={secondaryActionLabel}
                                                onClick={handleSecondaryAction}
                                            />
                                        )}
                                        
                                        <Button  
                                            disabled={disabled}
                                            label={actionLabel}
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Modal;