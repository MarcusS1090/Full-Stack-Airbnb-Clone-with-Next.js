'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import userRegisterModal from '@/app/hooks/userRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input'
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = userRegisterModal();

    //vamos a agregar nuestros estados del login, asi sabremos cuando esta abierto
    //o cerrado o si se envio la informacion bien o tenemos algun error
    const [isLoading, setIsloading] = useState(false);

    //aqui vamos a poner nuestras propiedades de el formulario
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name:'',
            email:'',
            password:''
        }
    });

    //aqui vamos a hacer nuestra funcion de enviar (Submit)
    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        setIsloading(true);

        //aqui vamos a usar nuestro protocolo axios para registrar nuestos endpoint
        //por ahora solo vamos a crear la UI pero aun asi vamos a usar axios post
        axios.post('/api/register', data)
         .then(() => {
            registerModal.onClose();
         })
         .catch((error) => {
            toast.error('Algo salio mal');
            
            
         })
         .finally(() => {
            setIsloading(false);
         })
    }
    //aqui vamos a crear nuestro contenido para el body del registro
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Bienvenido a Airbnb'
                subtitle='crea una cuenta!'
            />
            <Input 
                id="email"
                label='Correo Electronico'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label='Nombre'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="email"
                type='password'
                label='Contraseña'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continua con Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label='Continua con GitHub'
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div 
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Ya tienes una cuenta?
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                        "
                    >
                        Iniciar sesion
                    </div>
                </div>
            </div>
        </div>    
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;