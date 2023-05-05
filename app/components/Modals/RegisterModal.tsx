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

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input'
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    //vamos a agregar nuestros estados del login, asi sabremos cuando esta abierto
    //o cerrado o si se envio la informacion bien o tenemos algun error
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        //aqui vamos a usar nuestro protocolo axios para registrar nuestos endpoint
        //por ahora solo vamos a crear la UI pero aun asi vamos a usar axios post
        axios.post('/api/register', data)
        .then(() => {
            toast.success('Success!');
            loginModal.onOpen();
            registerModal.onClose();
        })
        .catch((error) => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    //aqui vamos a hacer para cambiar entre login y register model2
    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);
    //aqui vamos a crear nuestro contenido para el body del registro
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome to Airbnb'
                subtitle='create an an account!'
            />
            <Input 
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type='password'
                label='Password'
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
                label='Continue con Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label='Continue con GitHub'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div 
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <p>¿Already have an account?
                    <span 
                        onClick={toggle} 
                        className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline
                        "
                        >Log in</span>
                </p>
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