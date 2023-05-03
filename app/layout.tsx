import { Nunito } from "next/font/google";

import './globals.css'

//este es nuestro componente para arreglar el bug de el refresco de pagina
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

import  NavBar  from "./components/NavBar/NavBar";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";

import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: 'Airbnb-clone',
  description: 'Clone of Airbnb from marcusCode',
}

const font = Nunito({
  subsets: ["latin"]
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal  />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
