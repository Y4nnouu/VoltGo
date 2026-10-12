// Récupère les bornes de recharge (IRVE) autour d'un point via l'API Opendatasoft, avec filtres facultatifs
export const Irve = async (
    latitude,
    longitude,
    rayon,
    horaires,
    vitesse,
    paiement,
    prise
) => {
    try {
        // URL de base : bornes dans le rayon autour des coordonnées (1000 résultats max)
        let URL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=mobilityref-france-irve-220&geofilter.distance=${latitude},${longitude},${rayon}&rows=1000`;

        // Filtre Horaires
        if (horaires === "24/7") {
            URL += `&refine.horaires=24/7`;
        }

        // Filtre vitesse de charge (puissance nominale)
        if (vitesse && vitesse !== "false") {
            URL += `&q=puissance_nominale:[${vitesse}]`;
        }

        // Filtre moyen de paiement : carte bancaire, à l'acte ou badge
        if (paiement && paiement !== "false") {
            switch (paiement) {
                case "cb": URL += `&refine.paiement_cb=1`; break;
                case "acte": URL += `&refine.paiement_acte=1`; break;
                case "badge": URL += `&refine.paiement_autre=1`; break;
            }
        }

        // Filtre type de prise
        if (prise && prise !== "false") {
            switch (prise) {
                case "ef": URL += `&refine.prise_type_ef=1`; break;
                case "type2": URL += `&refine.prise_type_2=1`; break;
                case "chademo": URL += `&refine.prise_type_chademo=1`; break;
                case "ccs": URL += `&refine.prise_type_combo_ccs=1`; break;
                case "autre": URL += `&refine.prise_type_autre=1`; break;
            }
        }

        // Appel à l'API (l'URL est encodée avant l'envoi)
        const response = await fetch(encodeURI(URL));

        // Erreur HTTP renvoyée par l'API
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données IRVE");
        }

        // Renvoie les données JSON brutes à la route
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error("Erreur IRVE Service:", error.message);
        // Relance l'erreur pour que la route puisse la gérer
        throw error;
    }
};