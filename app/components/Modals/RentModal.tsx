'use client';

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../NavBar/Categories"
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

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
    const rentModal = useRentModal();

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

    //las funciones para saber si volvemos o o retrocedemos
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
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
    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    )
}

export default RentModal;