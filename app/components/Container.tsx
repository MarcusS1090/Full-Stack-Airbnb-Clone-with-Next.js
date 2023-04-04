//por ahora esto es nuestro cliente componente, para no usarlo como servidor
'use client';

//vamos a crear una interfaz, para nuestro contenedor children
interface ContainerProps {
    children: React.ReactNode
  };
  
  const Container: React.FC<ContainerProps> = ({ children }) => {
    return ( 
      <div
        className="
          max-w-[2520px]
          mx-auto
          xl:px-20 
          md:px-10
          sm:px-2
          px-4
        "
      >
        {children}
      </div>
     );
  }
   
  export default Container;