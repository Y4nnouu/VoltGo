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
       
        let URL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=mobilityref-france-irve-220&geofilter.distance=${latitude},${longitude},${rayon}&rows=1000`;

        // Filtre Horaires
        if (horaires === "24/7") {
            URL += `&refine.horaires=24/7`;
        }

        
        if (vitesse && vitesse !== "false") {
            URL += `&q=puissance_nominale:[${vitesse}]`;
        }

        
        if (paiement && paiement !== "false") {
            switch (paiement) {
                case "cb": URL += `&refine.paiement_cb=1`; break;
                case "acte": URL += `&refine.paiement_acte=1`; break;
                case "badge": URL += `&refine.paiement_autre=1`; break;
            }
        }

        
        if (prise && prise !== "false") {
            switch (prise) {
                case "ef": URL += `&refine.prise_type_ef=1`; break;
                case "type2": URL += `&refine.prise_type_2=1`; break;
                case "chademo": URL += `&refine.prise_type_chademo=1`; break;
                case "ccs": URL += `&refine.prise_type_combo_ccs=1`; break;
                case "autre": URL += `&refine.prise_type_autre=1`; break;
            }
        }

        const response = await fetch(encodeURI(URL));

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données IRVE");
        }

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error("Erreur IRVE Service:", error.message);
        throw error;
    }
};