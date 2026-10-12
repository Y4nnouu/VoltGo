// Convertit une adresse en coordonnées GPS grâce à l'API Nominatim (OpenStreetMap)
export const geocodeAddress = async (address) => {
    try {
        // Requête limitée à la France et à 1 résultat (l'adresse est encodée pour l'URL)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=fr&limit=1`
        );

        // Erreur HTTP renvoyée par l'API
        if (!response.ok) {
            throw new Error("Oups ! une erreur est survenue ");
        }

        const data = await response.json();

        // Un résultat trouvé : on extrait la latitude et la longitude
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { 
                latitude: parseFloat(lat), 
                longitude: parseFloat(lon) 
            };
        } else {
            // Aucun résultat pour cette adresse
            throw new Error("Le lieu saisi est introuvable !");
        }

    } catch (error) {
        console.error("Erreur Geocoding Service:", error.message);
        // Relance l'erreur pour que la route puisse la gérer
        throw error; 
    }
};