import Marquee from "react-fast-marquee";

// Carrousel de logos défilants avec react-fast-marquee
function LogoCarousel() {
    // Liste des chemins vers les logos des opérateurs
    const logos = [
        "/logos/Ionity.png",
        "/logos/izivia.png",
        "/logos/powerdot.png",
        "/logos/r3.png",
        "/logos/shell.png",
        "/logos/totalenergie.png",
        "/logos/zunder.png",
        "/logos/tesla.png",
        "/logos/Allego.png",
        "/logos/atlante.png",
        "/logos/driveco.png",
        "/logos/electra.png",
        "/logos/etotem.png",
        "/logos/freshmile.png",
    ];

    return (
        <div className="w-full md:py-6 bg-white mb-25">
            {/* Marquee : défilement automatique avec gradient sur les bords */}
            <Marquee gradient={true} speed={60}>
                {/* Double le tableau pour avoir un défilement infini sans coupure */}
                {[...logos, ...logos].map((logo, i) => (
                    <img
                        key={i}
                        src={logo}
                        alt="logos"
                        className="h-10 md:h-20 mx-8 opacity-80 flex-shrink-0"
                    />
                ))}
            </Marquee>
        </div>
    );
}

// Composant principal avec titre et carrousel
export function LogoMarquee() {
    return (
        <div className="flex flex-col justify-center">
            
            <h2 className="mt-18 mb-15 md:mt-25 md:mb-20 text-center w-full p-2 font-black md:font-extrabold text-[28px] md:text-5xl text-[#183D3D]">
                Plus de 15 opérateurs à votre service<br />
                partout en France !
            </h2>
            <LogoCarousel />
        </div>
    );
}