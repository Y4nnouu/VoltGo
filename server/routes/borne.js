import express from "express";

const router = express.Router();

router.post("/details", async (req, res) => {
  try {
    const { id_station_itinerance, records } = req.body;

    // Vérification des données reçues
    if (!id_station_itinerance || !records || !Array.isArray(records)) {
      return res.status(400).json({ error: "Données manquantes" });
    }

    // On cherche toutes les bornes qui ont le même id_station_itinerance
    const bornesTrouvees = [];

    for (let i = 0; i < records.length; i++) {
      if (records[i].fields?.id_station_itinerance === id_station_itinerance) {
        bornesTrouvees.push(records[i]);
      }
    }

    // Si on n'a rien trouvé, on cherche par recordid
    if (bornesTrouvees.length === 0) {
      for (let i = 0; i < records.length; i++) {
        if (records[i].recordid === id_station_itinerance) {
          bornesTrouvees.push(records[i]);
          break;
        }
      }
    }

    // Si on n'a toujours rien, erreur
    if (bornesTrouvees.length === 0) {
      return res.status(404).json({ error: "Station non trouvée" });
    }

    // On prend les infos de la première borne trouvée
    const infosPrincipales = bornesTrouvees[0].fields;

    // On récupère tous les types de prises (sans doublons)
    const typesPrises = [];

    for (let i = 0; i < bornesTrouvees.length; i++) {
      const borne = bornesTrouvees[i].fields;

      if (
        borne.prise_type_ef === "1" &&
        !typesPrises.includes("E/F (Domestique)")
      ) {
        typesPrises.push("E/F (Domestique)");
      }
      if (borne.prise_type_2 === "1" && !typesPrises.includes("Type 2")) {
        typesPrises.push("Type 2");
      }
      if (
        borne.prise_type_combo_ccs === "1" &&
        !typesPrises.includes("Combo CCS")
      ) {
        typesPrises.push("Combo CCS");
      }
      if (
        borne.prise_type_chademo === "1" &&
        !typesPrises.includes("CHAdeMO")
      ) {
        typesPrises.push("CHAdeMO");
      }
      if (borne.prise_type_autre === "1" && !typesPrises.includes("Autre")) {
        typesPrises.push("Autre");
      }
    }

    // On récupère toutes les puissances (sans doublons)
    const puissances = [];

    for (let i = 0; i < bornesTrouvees.length; i++) {
      const puissance = bornesTrouvees[i].fields.puissance_nominale;
      if (puissance !== null && !puissances.includes(puissance)) {
        puissances.push(puissance);
      }
    }

    // On prépare la réponse
    const detailsBorne = {
      id: id_station_itinerance,
      nom: infosPrincipales.nom_station,
      adresse: infosPrincipales.adresse_station,
      operateur: infosPrincipales.nom_operateur,
      types_prises: typesPrises,
      puissances: puissances,
      nb_points_charge: bornesTrouvees.length,
      coordonnees: [infosPrincipales.latitude, infosPrincipales.longitude],
      horaires: infosPrincipales.horaires,
      paiement_cb: infosPrincipales.paiement_cb === "1",
      paiement_acte: infosPrincipales.paiement_acte === "1",
      paiement_autre: infosPrincipales.paiement_autre === "1",
      acces_pmr: infosPrincipales.accessibilite_pmr,
      gratuit: infosPrincipales.gratuit === "1",
      reservation: infosPrincipales.reservation === "1",
      condition_acces: infosPrincipales.condition_acces,
      implantation: infosPrincipales.implantation_station,
      enseigne: infosPrincipales.nom_enseigne,
      date_service: infosPrincipales.date_mise_en_service,
    };
    res.json(detailsBorne);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
