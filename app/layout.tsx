import { Nunito } from "next/font/google";
import  NavBar  from "./components/NavBar/NavBar";

//este es nuestro componente para arreglar el bug de el refresco de pagina
import './globals.css'
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";


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
          <RegisterModal />
          <LoginModal />
          <NavBar currentUser = {currentUser} />
        </ClientOnly>
        {children}  
      </body>
    </html>
  )
}
