export const geocodeAddress = async (address) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=fr&limit=1`
        );

        if (!response.ok) {
            throw new Error("Oups ! une erreur est survenue ");
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { 
                latitude: parseFloat(lat), 
                longitude: parseFloat(lon) 
            };
        } else {
            throw new Error("Le lieu saisi est introuvable !");
        }

    } catch (error) {
        console.error("Erreur Geocoding Service:", error.message);
        throw error; 
    }
};