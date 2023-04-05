import { Nunito } from "next/font/google";
import  NavBar  from "./components/NavBar/NavBar";

//este es nuestro componente para arreglar el bug de el refresco de pagina
import './globals.css'
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: 'Airbnb-clone',
  description: 'Clone of Airbnb from marcusCode',
}

const font = Nunito({
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <NavBar />
        </ClientOnly>
        {children}  
      </body>
    </html>
  )
}
