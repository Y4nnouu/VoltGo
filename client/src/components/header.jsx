import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";  

// Style réutilisable pour les liens de navigation 
const classNavItem =
  "inline-block drop-shadow-sm/100 hover:scale-108 hover:drop-shadow-sm/100 transition-all duration-850";

// Barre de navigation avec les liens principaux
function Navbar() {
  return (
    <div className="mx-auto w-100 backdrop-blur-[2.5px] bg-white/10 rounded-full p-3 shadow-md text-white font-bold border-b border-white/20   ">
      <ul className="flex justify-around">
        <li>
          <a className={classNavItem} href="/">
            Accueil
          </a>
        </li>
        <li>
          <a className={classNavItem} href="/map">
            Carte
          </a>
        </li>
        <li>
          <a className={classNavItem} href="#">
            Aide
          </a>
        </li>
        <li>
          <a className={classNavItem} href="#">
            À propos
          </a>
        </li>
      </ul>
    </div>
  );
}

// Composant qui affiche soit le bouton Portail, soit le profil utilisateur
function Profile({ user }) {
 
  // Si l'utilisateur n'est pas connecté, affiche le bouton Portail
  if (!user) {
    return (
      <div className="flex mr-6 items-center">
        <a
          href="/portail"
          className="bg-white/10 backdrop-blur-[2.5px] border border-white/20 px-8 py-2 rounded-full text-white font-bold drop-shadow-sm/100  shadow-md hover:bg-[#23D097] hover:text-[#252e2d] transition-all duration-300"
        >
          Portail
        </a>
      </div>
    );
  }

  // Si l'utilisateur est connecté, affiche son nom et l'icône profil
  return (
    <Link to="/profil"> 
      <div className="flex flex-row mr-6 items-center gap-3 p-1 backdrop-blur-[2.5px] bg-white/10 rounded-full shadow-md text-white font-bold border-b border-white/20 hover:bg-white/20 transition-all cursor-pointer ">
        <div className="pl-4 py-2">
          <p className="drop-shadow-sm/100">Hello, {user.name || user.nom} !</p>
        </div>
        
        <div className="flex items-center justify-center bg-white/90 rounded-full w-10 h-10 shadow-md">
          <i className="fa-regular fa-user" style={{ color: "#000000" }}></i>
        </div>
      </div>
    </Link>
  );
}

// Composant principal du Header fixé en haut de l'écran
export function Header({user}) {
  return (
    // Fixed en haut, z-50 pour être au-dessus de tout
    <header className="fixed top-0 z-50 w-full p-4 bg-transparent">
      <div className="flex items-center justify-around">
        <img className="w-32 drop-shadow-sm/90" src={logo} alt="logo" />
        <Navbar />
        <Profile user={user} /> {/* Passe les infos utilisateur */}
      </div>
    </header>
  );
}