import { useState } from "react";
import { Link } from "react-router-dom"; 
import logo from '../assets/img/logo.png';

// Menu burger hamburger avec animation
function HamburgerMenu({ isOpen, toggleMenu, user }) {
    return (
        <div className="relative">
            {/* Bouton burger avec animation des barres */}
            <div className="flex flex-col gap-1 cursor-pointer fixed top-4 left-4 z-[100000] drop-shadow-sm/100" onClick={toggleMenu}>
        
                <span className={`block w-8 h-1 bg-white transition rounded-full ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          
                <span className={`block w-8 h-1 bg-white transition rounded-full ${isOpen ? "opacity-0" : ""}`}></span>
              
                <span className={`block w-8 h-1 bg-white transition rounded-full ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>

            {/* Menu latéral qui s'affiche quand isOpen = true */}
            {isOpen && (
                <>
                  
                    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 z-5" onClick={toggleMenu}></div>
                    
               
                    <div className="w-[80%] h-screen bg-[#20A177] fixed top-0 left-0 z-10 shadow-2xl">
                        <div className="flex justify-center p-4">
                            <img className="w-[40%] drop-shadow-sm/90" src={logo} alt="logo" />
                        </div>

                        <ul className="text-white text-3xl font-bold p-10 flex flex-col gap-4">
                            <li><Link to="/" onClick={toggleMenu}>Menu</Link></li>
                            <li><Link to="/carte" onClick={toggleMenu}>Carte</Link></li>
                            
                            {/* Affiche "Profil" si connecté, sinon "Portail" */}
                            <li>
                                <Link to={user ? "/profil" : "/portail"} onClick={toggleMenu}>
                                    {user ? "Profil" : "Portail"}
                                </Link>
                            </li>

                            <li><Link to="/aide" onClick={toggleMenu}>Aide</Link></li>
                            <li><Link to="/propos" onClick={toggleMenu}>À propos</Link></li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

// Header mobile avec menu burger
export function Phoneheader({ user }) {
    // État pour ouvrir/fermer le menu
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center z-10000 p-3">
            
            <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} user={user} />

            {/* Logo affiché à droite quand le menu est fermé */}
            {!isOpen && (
                <img
                    className="w-[25%] max-w-[100px] ml-auto drop-shadow-sm/100"
                    src={logo}
                    alt="logo"
                />
            )}
        </div>
    );
}