'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import userRegisterModal from '@/app/hooks/userRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input'
import Button from '../Button';


const LoginModal = () => {
    const router = useRouter();
    const registerModal = userRegisterModal();
    const loginModal = useLoginModal();

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
            email:'',
            password:''
        }
    });

    //aqui vamos a hacer nuestra funcion de enviar (Submit)
    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        setIsloading(true);

        //aqui vamos a crear nuestra funcion para conectarse a la cuenta y si tenemos un error
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsloading(false);

            if (callback?.ok) {
                toast.success("Iniciaste Sesion");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);   
            }
        })
        
    }
    //aqui vamos a crear nuestro contenido para el body del registro
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Bienvenido de vuelta'
                subtitle='Entra en tu cuenta!'
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
                id="password"
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
                onClick={() => signIn('github')}
            />
            <div className="
                text-neutral-500 text-center mt-4 font-light">
                <p>¿Primera vez usando Airbnb?
                    <span 
                        onClick={() => {}} 
                        className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline
                        "
                    > Crear una cuenta</span>
                </p>
            </div>
        </div>   
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Iniciar Sesion"
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;