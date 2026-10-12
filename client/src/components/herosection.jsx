import {Form} from 'react-router-dom'
import backgroundImg from '../assets/img/backgroundHome.jpg'

// Barre de recherche qui redirige vers /map avec le paramètre de recherche
function Searchbar() {
    return (
        // Form de React Router qui envoie les données en GET vers /map
        <Form method='GET' action='/map' className='flex bg-white w-[90%] lg:w-[900px] rounded-full shadow-2xl/100 mt-15 md:mt-20 lg:mt-35 '> 
            <input 
                className='pt-3 pr-1 pb-3 pl-2.5  md:pt-4 md:pr-4 md:pb-4 md:pl-6 w-full rounded-full text-sm md:text-xl placeholder-gray-500' 
                type="text" 
                name="q"  // Le paramètre sera envoyé comme ?q=valeur
                id="q" 
                placeholder="Où souhaitez-vous recharger ?" 
            />
            <button 
                type='submit' 
                className='w-13 p-2.2 md:p-4 md:w-17 rounded-full bg-[#23D097] scale-85 shadow-2xl cursor-pointer hover:scale-100 transition-all duration-300 active:scale-85'
            >
                <i className="fa-solid fa-magnifying-glass text-lg" style={{ color: '#000000' }}></i>
            </button>
        </Form>
    )
}

// Section hero avec image de fond et barre de recherche
export function Herosection() {
    return (
     
        <div
            className="pt-25 sm:pt-20 lg:pt-50 h-[580px] md:min-h-[750px] md:h-screen w-auto bg-no-repeat bg-cover bg-center rounded-b-[50px] ps-[8%] md:ps-[10%]"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div>
                <h1 className="text-[45px] font-black md:text-[80px] text-[#4AE9B6] md:font-extrabold">
                    Roulez sans limites !
                </h1>
                <h2 className="mt-5 lg:mt-8 text-[25px] md:text-[50px] text-white font-extrabold md:font-bold text-shadow-lg">
                    Trouvez votre borne de <br />recharge maintenant
                </h2>
            </div>

            <Searchbar />
        </div>
    );
}