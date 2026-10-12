/**
 * Liste des cartes bornes
 * Strictement ton JSX original
 */
export default function BornesList({ listeBornes, isActive, setIsActive }) {
  return (
    <>
      {listeBornes.map((borne) => (
        <div
          key={borne.recordid}
          className={`rounded-[20px] w-full bg-white flex flex-col cursor-pointer ${
            isActive === borne.recordid ? "ring-6 ring-[#23d196]" : ""
          }`}
          onClick={() => setIsActive(borne.recordid)}
        >
          <div className="p-3 flex flex-col gap-2">
            <h3 className="font-black line-clamp-1 text-[13px] sm:text-[16px] lg:text-[18px] text-[#188F67]">
              {borne.fields.nom_station}
            </h3>

            <p className="line-clamp-2 font-normal lg:font-light text-[12px] sm:text-[15px] lg:text-[18px]">
              {borne.fields.adresse_station}
            </p>
          </div>

          <div className="bg-[#23d196] rounded-[20px] p-1.5 font-bold text-white flex flex-row justify-between items-center px-4 gap-2">
            <p className="font-extrabold text-[12px] sm:text-[17px] lg:text-[18px] shrink-0 whitespace-nowrap">
              {borne.fields.puissance_nominale === 0
                ? "kW Inconnu"
                : `${borne.fields.puissance_nominale} kW`}
            </p>

            <p className="flex-1 text-center line-clamp-1 text-[12px] sm:text-[16px] lg:text-[16px] font-bold">
              {borne.fields.nom_operateur}
            </p>

            
          </div>
        </div>
      ))}
    </>
  );
}
