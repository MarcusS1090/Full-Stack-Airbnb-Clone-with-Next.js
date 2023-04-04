import { Nunito } from "next/font/google";
import  NavBar  from "./components/NavBar/NavBar";

import './globals.css'

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
      <NavBar>
        {children}
      </NavBar>   
      </body>
    </html>
  )
}
