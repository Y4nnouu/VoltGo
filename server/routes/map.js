import express from 'express';
import { geocodeAddress } from "../services/geocoding.js";
import { Irve } from "../services/IRVE.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { q, rayon, horaires, vitesse, paiement, prise } = req.query;

      
        if (!q || q.trim() === "") {
            return res.json({
                Bornes: [],
                latitude: 46.6,
                longitude: 2.2,
                zoom: 5, 
                adresse: "",
                error: null
            });
        }

    
        const coords = await geocodeAddress(q);
        
        const bornesData = await Irve(
            coords.latitude, 
            coords.longitude, 
            rayon || "1000",
            horaires === "24/7" ? "24/7" : false,
            vitesse === "false" ? false : vitesse,
            paiement === "false" ? false : paiement,
            prise === "false" ? false : prise
        );

        res.json({
            Bornes: bornesData,
            latitude: coords.latitude,
            longitude: coords.longitude,
            zoom: 15, 
            adresse: q,
            error: null
        });

    } catch (error) {
        console.error("Erreur Route Map:", error.message);
        
       
        res.status(500).json({ 
            Bornes: [], 
            latitude: 46.6,
            longitude: 2.2,
            zoom: 5,
            adresse: req.query.q || "",
            error: error.message || "Erreur lors de la recherche." 
        });
    }
});

export default router;