'use client';

import useRentModal from "@/app/hooks/useRentModal";
import dynamic from "next/dynamic";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../NavBar/Categories"
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

/*
AQUI VAMOS A TENER UN ENUM para nuestro Rentmodal, esto nos ayudara a la hora de obtener la informacion
paso a paso
*/
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY );
    //aqui vamos a hacer nuestras variables para nuestro formulario hook,tal como lo hicimos en el login
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    
    //aqui tenemos nuestros valores por defectos que ingresamos en nuestro listen en schema.prisma en la DB
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    //aqui usamos un watch para ver que se catagoria se selecciona
    const category = watch('category');
    //para poder importar Map.
    const location = watch('location');
    //para poder obtener el conteo de guest
    const guestCount = watch('guestCount');
    //para obtener el conteo de cuartos
    const roomCount = watch('roomCount');
    //para obtener el conteo de baños
    const bathroomCount = watch('bathroomCount');
    //para obtener la imagen de la casa
    const imageSrc = watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);
    /*
    aqui hacemos un setValue custom por que en react hook setValue por defecto no reenderiza la pagina
    asi que tenemos que darle otros valores
    */
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    //la funcion para saber si volvemos o retrocedemos
    const onBack = () => {
        setStep((value) => value - 1);
    };
    //la funcion para saber si vamos al siguiente paso
    const onNext = () => {
        setStep((value) => value + 1);
    }

    //funcion para un onSubmit button
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        //una condicion que sirve para ver si no estamos en el precio
        //entonces nos deje avanzar mientras no estemos en el ultimo paso que es price
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        //en caso de que estemos en el ultimo paso que es price entonces que cargue
        setIsLoading(true);
        //hacemos una peticion a la api para saber si todos los datos estan llenos correctament
        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    const actionLabel = useMemo(() => {
        if( step === STEPS.PRICE){
            return 'create'; 
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    //vamos a hacer un bodyContent variable dependiendo del paso(step) en el que estemos
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading    
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick= {(category) => setCustomValue('category', category)}
                            selected = {category === item.label}
                            label= {item.label}
                            icon= {item.icon}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
    //este es el paso para esocger localizacion
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div
                className=" flex flex-col gap-8"
            >
                <Heading    
                    title="Where is your place located?"
                    subtitle="Help guest find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }
    //este es el siguiente paso para info de nuestro airbnb
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <hr />
                <Counter
                    title="Guest"
                    subtitle="How many guest do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }
    //este es el paso para poner una imagen
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Add a photo of your place"
                    subtitle="Show guests waht your place looks like!"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    //este es el paso de la descripcion airbnb
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    //este es el paso para el precio de aribnb
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Now,set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input 
                    id="price"
                    label="Pirce"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    )
}

export default RentModal;