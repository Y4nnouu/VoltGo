// Import des images pour les articles (versions normale et optimisée)
import FirstArticleImg from '../assets/img/electric_station.jpg'
import FirstArticleImgSmall from '../assets/img/electric_station_small.jpg'
import SecondArticleImg from '../assets/img/plug_eletric_car.jpg'
import SecondArticleImgSmall from '../assets/img/plug_eletric_car_small.jpg'

// Styles réutilisables pour les conteneurs d'articles
const styleContainerArticle = "w-full md:w-[80%] lg:w-[800px] lg:h-[500px] bg-[#20A177] flex flex-col md:flex-row rounded-[50px] lg:rounded-[40px] overflow-hidden h-full shadow-2xl"
const styleContainerImg = "basis-1/2 flex justify-center items-center min-h-[300px] md:min-h-0"

// Premier article : statistiques sur le nombre de bornes en France
function FirstArticle() {
    return (
        <div className={styleContainerArticle}>
          
            <div className={styleContainerImg}>
                <div className="w-full h-full">
                    {/* Image responsive avec srcset pour optimiser le chargement */}
                    <img
                        src={FirstArticleImg}
                        srcSet={`${FirstArticleImgSmall} 900w, ${FirstArticleImg} 1024w`}
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                        alt="Image bornes de recharge"
                    />
                </div>
            </div>

          
            <div className="basis-1/2 flex flex-col p-8">
              
                <h2 className="text-white/75 font-black text-5xl text-center">168 000</h2>
                
                
                <span className="text-white mt-7 leading-relaxed md:text-[20px]">
                    C'est le nombre de bornes de recharge disponibles en France pour votre véhicule électrique,
                    un réseau en développement constant qui rend vos recharges rapides et accessibles.<br /><br />
                    Sur <b>VoltGo</b>, retrouvez toutes les bornes les plus proches de chez vous !
                </span>
                
             
                <a
                    className="mt-3 text-white/75 italic underline"
                    target="_blank"
                    href="https://www.economie.gouv.fr/actualites/les-bornes-de-recharge-se-deploient-sur-le-territoire?utm_source=chatgpt.com"
                >
                    Source
                </a>
            </div>
        </div>
    );
}

// Deuxième article : types de prises disponibles
function SecondArticle() {
    return (
        <div className={styleContainerArticle}>
           
            <div className={styleContainerImg}>
                <div className="w-full h-full">
                    {/* Image responsive */}
                    <img
                        src={SecondArticleImg}
                        srcSet={`${SecondArticleImgSmall} 900w, ${SecondArticleImg} 1024w`}
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                        alt="Image prise recharge de voiture"
                    />
                </div>
            </div>

           
            <div className="basis-1/2 flex flex-col p-7">
             
                <h2 className="text-white/75 font-black text-4xl text-center">6 Modèles de prises</h2>

                <div className="flex flex-col text-white mt-7 leading-relaxed md:text-[20px]">
                    <span>Plusieurs modèles sont disponibles partout en France pour votre voiture :</span>
                    
              
                    <ul className="list-disc list-inside mt-7 ">
                        <li>Type 2 (Mennekes)</li>
                        <li>Type 3 (Scame)</li>
                        <li>CCS Combo 2 (Combo 2)</li>
                        <li>CHAdeMO</li>
                        <li>Prise domestique</li>
                        <li>Tesla Connector</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Composant principal qui affiche la section complète
export function Articlesection() {
    return (
        <div>
            
            <h1 className="text-center leading-[1] p-2  md:p-5 mt-10 mb-10 md:mt-18 md:mb-24 font-black md:font-extrabold text-[32px] md:text-5xl text-[#183D3D]">
                Besoin de Volts pour votre voiture électrique ?
            </h1>

            
            <div className="flex flex-col lg:flex-row gap-20 md:gap-20 lg:gap-30 justify-center items-center">
                <FirstArticle />
                <SecondArticle />
            </div>
        </div>
    );
}