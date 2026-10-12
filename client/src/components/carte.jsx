import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

// Composant qui force la carte à se recentrer quand les coordonnées changent
function ChangeView({ center, zoom }) {
  const map = useMap(); // Récupère l'instance de la carte Leaflet
  
  useEffect(() => {
    // Déplace la carte vers le nouveau centre avec le bon zoom
    map.setView(center, zoom);
  }, [center, zoom, map]); // S'exécute quand center ou zoom change
  
  return null; // Ne rend rien visuellement
}

// Composant principal de la carte
export function Carte({
  allRecords,    // Tous les records pour les passer à DetailsBorne
  liste,         // Liste des bornes à afficher sur la carte
  latitude,      // Latitude du centre de la carte
  longitude,     // Longitude du centre de la carte
  zoom,          // Niveau de zoom initial
  activeId,      // ID de la borne sélectionnée dans la liste
}) {
  // Stocke les références de tous les marqueurs pour pouvoir ouvrir leur popup
  const markerRefs = useRef({});

  // Ouvre automatiquement le popup de la borne sélectionnée
  useEffect(() => {
    if (activeId && markerRefs.current[activeId]) {
      markerRefs.current[activeId].openPopup();
    }
  }, [activeId]);

  // Récupère les paramètres de l'URL (recherche et rayon)
  const url = new URL(window.location.href);
  const searchQ = url.searchParams.get("q");
  const rayon = url.searchParams.get("rayon");

  // Calcul du zoom final selon le rayon de recherche
  let finalZoom = zoom ?? 5; // Valeur par défaut : 5

  // Ajuste le zoom selon le rayon sélectionné
  if (searchQ && rayon) {
    switch (rayon) {
      case "1000": // 1 km
        finalZoom = 15;
        break;
      case "2000": // 2 km
        finalZoom = 14;
        break;
      case "3000": // 3 km
        finalZoom = 13;
        break;
      default:
        finalZoom = 15;
    }
  }

  // Position du centre de la carte (France par défaut si pas de coordonnées)
  const center = [latitude || 46.6, longitude || 2.2];

  return (
    <div className="h-full w-full rounded-[20px] overflow-hidden shadow-lg">
      <MapContainer
        // Force la carte à se recréer quand la position ou le zoom change
        key={`${latitude}-${longitude}-${finalZoom}`}
        center={center}
        zoom={finalZoom}
        minZoom={5}  // Zoom minimum (vue France entière)
        maxZoom={18} // Zoom maximum (vue très rapprochée)
        scrollWheelZoom={false} // Désactive le zoom avec la molette
        className="h-full w-full"
      >
        {/* Couche de tuiles OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Composant pour mettre à jour la vue */}
        <ChangeView center={center} zoom={finalZoom} />

        {/* Affiche un marqueur pour chaque borne */}
        {liste.map((borne) => (
          <Marker
            key={borne.recordid}
            position={[borne.fields.latitude, borne.fields.longitude]}
            // Stocke la référence du marqueur pour pouvoir ouvrir son popup
            ref={(el) => {
              if (el) markerRefs.current[borne.recordid] = el;
            }}
          >
            {/* Popup qui s'affiche au clic sur le marqueur */}
            <Popup
              maxWidth={245}
              minWidth={200}
              className="rounded-xl shadow-2xl"
            >
              <div className="flex gap-3 sm:gap-4 flex-col p-1 sm:p-2">
                {/* Bouton "+ d'infos" qui redirige vers la page détails */}
                <div className="flex justify-start items-center w-full">
                  <Link
                    className="!text-white py-2 px-4 sm:py-2.5 sm:px-5 bg-[#23D097] rounded-full text-[13px] sm:text-[15px] font-black shadow-md hover:bg-[#1eb885] transition-colors uppercase tracking-wider"
                    to={`/bornes/${borne.recordid}`}
                    // Passe les données de la borne et tous les records
                    state={{ borneData: borne, records: allRecords }}
                  >
                    + d'infos
                  </Link>
                </div>

                {/* Nom et adresse de la borne */}
                <div className="space-y-1">
                  <h3 className="font-black text-[16px] sm:text-[18px] leading-tight text-[#252e2d] tracking-tight">
                    {borne.fields.nom_station}
                  </h3>

                  <div className="flex items-center gap-2 p-1">
                    <p className="text-[14px] sm:text-[16px] text-gray-600 font-medium leading-snug flex-1 italic">
                      {borne.fields.adresse_station}
                    </p>

                    {/* Icône pour copier l'adresse */}
                    <i
                      className="fa-regular fa-copy text-gray-400 text-[16px] sm:text-[18px] cursor-pointer hover:text-[#23D097] active:text-green-700 p-1"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          borne.fields.adresse_station
                        )
                      }
                    ></i>
                  </div>
                </div>

                {/* Informations détaillées (cachées sur mobile) */}
                <ul className="hidden sm:flex flex-col  mt-1 border-t pt-3 border-gray-100">
                  {/* Nombre de prises */}
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-green-50 rounded-full text-[#188F67]">
                      <i className="fa-solid fa-plug text-[10px]"></i>
                    </div>
                    <h4 className="text-[15px] font-bold text-gray-400 uppercase  w-20">
                      Prises :
                    </h4>
                    <p className="text-[16px] font-black text-[#252e2d]">
                      {borne.fields.nbre_pdc}
                    </p>
                  </li>

                  {/* Puissance */}
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-green-50 rounded-full text-[#188F67]">
                      <i className="fa-solid fa-bolt text-[10px]"></i>
                    </div>

                    <h4 className="text-[15px] font-bold text-gray-400 uppercase shrink-0">
                      Puissance:
                    </h4>

                    <p className="text-[16px] font-black text-[#252e2d] ml-auto">
                      {borne.fields.puissance_nominale || "N/A"}{" "}
                      <span className="text-[13px] font-bold">kW</span>
                    </p>
                  </li>

                  {/* Opérateur */}
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-green-50 rounded-full text-[#188F67]">
                      <i className="fa-solid fa-id-card text-[10px]"></i>
                    </div>

                    <h4 className="text-[15px] font-bold text-gray-400 uppercase shrink-0 ">
                      Opérateur :
                    </h4>

                    <p className="text-[14px] font-extrabold text-[#252e2d] line-clamp-1 ">
                      {borne.fields.nom_operateur}
                    </p>
                  </li>
                </ul>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}