// Bouton pour ouvrir la carte
function MapLink() {
    return (
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 justify-around items-center bg-[#23D097] lg:p-8 p-5 sm:w-[95%] max-w-[900px] rounded-[40px] md:rounded-full shadow-2xl">
            <h1 className="font-black text-3xl sm:text-4xl shrink-0 lg:text-5xl text-center md:text-left">
                À vos Volts, prêts, partez !
            </h1>

            <a
                href="/map"
                className="p-6 bg-[#EDEDED] shadow-xl rounded-full text-lg hover:scale-105 hover:shadow-2xl active:scale-100 transition-all duration-300"
            >
                Ouvrir la carte
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-sm"></i>
            </a>
        </div>
    )
}

// Section tutoriel en 3 étapes
export function TutoSection() {

    // Styles réutilisables pour les éléments du tutoriel
    const h2 = 'hidden md:flex w-16 items-center justify-center text-[#C7E7DD] text-7xl font-black'
    const h3 = 'text-[20px] md:text-2xl font-bold text-white drop-shadow-sm/50'
    const label = 'flex items-center gap-4 md:gap-6 rounded-[60px] md:rounded-full bg-[#5DA08B] shadow-xl w-full lg:w-[50%] px-4 py-4'
    const icon = 'flex items-center justify-center rounded-full bg-white w-12 h-12 md:w-24 md:h-24 shadow-lg flex-shrink-0'
    const textarea = 'flex flex-col text-sm md:text-base text-white p-1 lg:text-[20px]'

    return (
        <section className="bg-[#037650]/85 w-full rounded-t-[50px] pb-24 translate-y-12">
            <div className="flex flex-col items-center gap-12">

                <h1 className="text-[36px] md:text-5xl p-6 lg:p-10 font-black text-[#C7E7DD] text-center">
                    Comment ça fonctionne ?
                </h1>

                {/* Liste des 3 étapes du tutoriel */}
                <ul className="flex flex-col gap-6 w-full items-center sm:w-[90%]">
                    {/* Étape 1 : Recherche */}
                    <li className="flex items-center justify-center w-full">
                        <h2 className={h2}>1</h2>

                        <div className={label}>
                            <div className={icon}>
                                <i className="fa-solid fa-magnifying-glass text-xl md:text-3xl text-black"></i>
                            </div>

                            <div className={textarea}>
                                <h3 className={h3}>Recherchez une ville</h3>
                                <span className="mt-1 leading-relaxed">
                                    Saisissez le nom d&apos;une ville dans la barre de recherche pour afficher les bornes disponibles autour de vous.
                                </span>
                            </div>
                        </div>
                    </li>

                    {/* Étape 2 : Filtrage */}
                    <li className="flex items-center justify-center w-full">
                        <h2 className={h2}>2</h2>

                        <div className={label}>
                            <div className={icon}>
                                <i className="fa-solid fa-sliders text-xl md:text-3xl text-black"></i>
                            </div>

                            <div className={textarea}>
                                <h3 className={h3}>Filtrez selon vos besoins</h3>
                                <span className="mt-1 leading-relaxed">
                                    Ajustez les réglages : type de prise, vitesse de charge, avis…
                                    Trouvez les bornes qui correspondent à votre véhicule.
                                </span>
                            </div>
                        </div>
                    </li>

                    {/* Étape 3 : Sélection */}
                    <li className="flex items-center justify-center w-full">
                        <h2 className={h2}>3</h2>

                        <div className={label}>
                            <div className={icon}>
                                <i className="fa-solid fa-arrow-pointer text-xl md:text-3xl text-black"></i>
                            </div>

                            <div className={textarea}>
                                <h3 className={h3}>Choisissez votre borne</h3>
                                <span className="mt-1 leading-relaxed">
                                    Vérifiez les infos de la borne (puissance, type de prise, prix,
                                    disponibilité), puis branchez-vous et c&apos;est parti !
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>

                <MapLink />
            </div>
        </section>
    )
}