import {
  useLoaderData,
  useSubmit,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Carte } from "../components/carte.jsx";

// Composants découpés
import SearchBar from "../components/SearchBar.jsx";
import TriBar from "../components/TriBar.jsx";
import BornesList from "../components/BornesList.jsx";
import FiltersBar from "../components/FiltersBar.jsx";


export default function Map() {
  // Données venant du loader 
  const { Bornes, latitude, longitude, zoom, adresse, error } =
    useLoaderData();

  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const [setGlobalError] = useOutletContext();

  // États 
  const [value, setValue] = useState(""); // tri sélectionné
  const [isActive, setIsActive] = useState(null); // borne sélectionnée

  // Sécurisation tableau bornes 
  const records = Array.isArray(Bornes) ? Bornes : Bornes?.records || [];

  // Gestion erreur globale 
  useEffect(() => {
    if (error) setGlobalError(error);
  }, [error, setGlobalError]);

  // Suppression doublons : garde borne avec puissance max 
  const bornesUniques = records.reduce((acc, record) => {
    const id_borne = record.fields?.id_station_itinerance;
    if (!id_borne) return acc;

    const puissanceActuelle = record.fields?.puissance_nominale || 0;

    if (!acc[id_borne]) acc[id_borne] = record;
    else {
      const puissanceStockee =
        acc[id_borne].fields?.puissance_nominale || 0;
      if (puissanceActuelle > puissanceStockee) acc[id_borne] = record;
    }
    return acc;
  }, {});

  let listeBornes = Object.values(bornesUniques);

  // Tri 
  if (value === "operateur") {
    listeBornes.sort((a, b) =>
      (a.fields?.nom_operateur || "").localeCompare(
        b.fields?.nom_operateur || ""
      )
    );
  } else if (value === "puissance") {
    listeBornes.sort(
      (a, b) =>
        (b.fields?.puissance_nominale || 0) -
        (a.fields?.puissance_nominale || 0)
    );
  }

  // Submit auto des filtres 
  const handleChange = (e) => submit(e.currentTarget);

  return (
    <div className="flex flex-col-reverse lg:flex-row h-screen w-full overflow-hidden">

      {/* PANEL GAUCHE */}
      <div className="w-full lg:w-[600px] bg-[#252e2d] flex flex-col h-[35%] lg:h-full overflow-y-auto shrink-0 rounded-t-[20px] lg:rounded-t-[0px]">
        <div className="gap-4 sm:gap-6 flex flex-col w-full px-6 pt-5 sm:pt-10 lg:ps-[50px] lg:pt-[100px] lg:pb-[100px] lg:px-[50px]">

          {/* Barre de recherche */}
          <SearchBar />

          {/*  tri + compteur */}
          <TriBar value={value} setValue={setValue} listeBornes={listeBornes} />

          {/* Liste des bornes */}
          <BornesList
            listeBornes={listeBornes}
            isActive={isActive}
            setIsActive={setIsActive}
          />

        </div>
      </div>

      {/* PANEL DROIT */}
      <div className="flex-1 flex flex-col h-[65%] lg:h-full bg-gray-100">

        {/* Barre des filtres */}
        <FiltersBar
          adresse={adresse}
          searchParams={searchParams}
          handleChange={handleChange}
          submit={submit}
        />

        {/* Carte */}
        <div className="flex-1 pb-2.5 lg:pt-0 lg:p-10 lg:pb-10">
          <div className="h-full w-full rounded-[20px] overflow-hidden shadow-sm lg:shadow-xl">
            <Carte
              allRecords={records}
              liste={listeBornes}
              latitude={latitude}
              longitude={longitude}
              activeId={isActive}
              zoom={zoom}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
