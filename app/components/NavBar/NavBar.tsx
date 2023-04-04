/*
en esta parte nos traeremos todos los componentes de NavBar, para crear
nuestra barra de navaegacion, hacemos los estilos directamente,ya que tenemos
instalada la dependencia de tailwind
*/
import Container from "../Container";
import Search from "./Search";
import Logo from "./Logo"
import UserMenu from "./UserMenu";

const NavBar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="
                    py-4
                    border-b-[1px]
                "
            >
            <Container>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
                >
                    <Logo />
                    <Search />
                    <UserMenu />
                </div>
            </Container>
            </div>
        </div>
    )
}

export default NavBar;