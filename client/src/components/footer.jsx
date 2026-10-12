import logo from '../assets/img/logo.png'

// Style réutilisable pour les sections du footer
const DivsClass = 'flex flex-col justify-start items-start gap-3 '

// Composant qui contient les 3 sections du footer
function Sections() {
    return (
        // Responsive : colonnes sur mobile, lignes sur desktop
        <div className='flex md:justify-around justify-content items-center gap-20 flex-col-reverse flex-col md:flex-row w-full'>

            <div className={DivsClass}>
                <h5 className='font-bold'>Contact</h5>
                <p className='font-light'>contact@voltgo.com</p>

                <ul className='flex items-center gap-5'>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">
                            <i className="fa-brands fa-instagram text-4xl" style={{ color: '#ffffff' }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/" target="_blank">
                            <i className="fa-brands fa-facebook text-4xl" style={{ color: '#ffffff' }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/" target="_blank">
                            <i className="fa-brands fa-x-twitter text-4xl" style={{ color: '#ffffff' }}></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div className={DivsClass}>
                <h5 className='font-bold'>Liens utiles</h5>

                <ul className='flex flex-col items-start gap-3 font-light'>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Carte</a></li>
                    <li><a href="#">Aide</a></li>
                    <li><a href="#">À propos</a></li>
                </ul>
            </div>

            <div className={DivsClass}>
                <h5 className='font-bold'>Infos & politiques</h5>

                <ul className='flex flex-col items-start gap-3 font-light'>
                    <li><a href="#">Mentions légales</a></li>
                    <li><a href="#">Politique de confidentialité</a></li>
                    <li><a href="#">Aide</a></li>
                    <li><a href="#">Conditions d'utilisation</a></li>
                </ul>
            </div>

        </div>
    )
}

// Composant principal du Footer
export function Footer() {
    return (
        <div className="rounded-t-[50px] bg-[#313F3A] z-1 relative pb-10  flex flex-col justify-center items-center text-white">

            <div className='flex justify-center items-center mt-10 mb-15 flex-col '>
                <img className='w-[45%] md:w-[13%] drop-shadow-sm/90' src={logo} alt="logo" />
                <p>© 2025 ALL RIGHTS RESERVED</p>
            </div>
            
            <Sections />

        </div>
    )
}