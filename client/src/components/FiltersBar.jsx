import { Form } from "react-router-dom";

export default function FiltersBar({
  adresse,
  searchParams,
  handleChange,
  submit,
}) {
  return (
    <div className="pt-13 sm:pt-20 lg:pt-32 px-3 lg:ps-10 lg:pr-10 pb-2 lg:pb-5 overflow-x-auto">
      <div className="flex flex-row items-center gap-6 whitespace-nowrap">
        <Form
          method="GET"
          onChange={handleChange}
          className="flex flex-row items-center gap-4"
        >
          <input type="hidden" name="q" value={adresse} />

          {/* Rayon */}
          <div className="flex items-center gap-2">
            <label className="font-bold text-[#252e2d] hidden lg:block">
              Rayon
            </label>
            <select
              name="rayon"
              defaultValue={searchParams.get("rayon") || "1000"}
              className="bg-white text-black p-1.5 sm:p-2.5 rounded-[15px] shadow-sm/50"
            >
              <option selected value="1000">
                1 Km
              </option>
              <option value="2000">2 Km</option>
              <option value="3000">3 Km</option>
            </select>
          </div>

          {/* Horaires */}
          <div className="flex items-center gap-2">
            <label className="font-bold text-[#252e2d] hidden lg:block">
              Ouvert 24/7
            </label>
            <select
              name="horaires"
              defaultValue={searchParams.get("horaires") || "false"}
              className="bg-white text-black p-1.5 sm:p-2.5 rounded-[15px] shadow-sm/50"
            >
              <option value="" selected disabled className="lg:hidden">
                Horaires
              </option>
              <option value="false">Aucun</option>
              <option value="24/7">Oui</option>
            </select>
          </div>

          {/* Vitesse */}
          <div className="flex items-center gap-2">
            <label className="font-bold text-[#252e2d] hidden lg:block">
              Vitesse
            </label>
            <select
              name="vitesse"
              defaultValue={searchParams.get("vitesse") || "false"}
              className="bg-white text-black p-1.5 sm:p-2.5 rounded-[15px] shadow-sm/50"
            >
              <option value="" selected disabled className="lg:hidden">
                Vitesse
              </option>
              <option value="false">Aucun</option>
              <option value="0 TO 22">≤ 22 kW</option>
              <option value="23 TO 49">23-49 kW</option>
              <option value="50 TO 149">50-149 kW</option>
              <option value="150 TO 1000">≥ 150 kW</option>
            </select>
          </div>

          {/* Paiement */}
          <div className="flex items-center gap-2">
            <label className="font-bold text-[#252e2d] hidden lg:block">
              Paiement
            </label>
            <select
              name="paiement"
              defaultValue={searchParams.get("paiement") || "false"}
              className="bg-white text-black p-1.5 sm:p-2.5 rounded-[15px] shadow-sm/50"
            >
              <option value="" selected disabled className="lg:hidden">
                Paiement
              </option>
              <option value="false">Aucun</option>
              <option value="cb">Carte Bancaire</option>
              <option value="acte">Sans abonnement</option>
              <option value="badge">Badge</option>
            </select>
          </div>

          {/* Prise */}
          <div className="flex items-center gap-2">
            <label className="font-bold text-[#252e2d] hidden lg:block">
              Type de prise
            </label>
            <select
              name="prise"
              defaultValue={searchParams.get("prise") || "false"}
              className="bg-white text-black p-1.5 sm:p-2.5 rounded-[15px] shadow-sm/50"
            >
              <option value="" selected disabled className="lg:hidden">
                Type de prise
              </option>
              <option value="false">Aucun</option>
              <option value="ef">Domestique</option>
              <option value="type2">Type 2</option>
              <option value="chademo">CHAdeMO</option>
              <option value="ccs">Combo CCS</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          {/* Reset */}
          <button
            type="reset"
            className="p-2 bg-[#23D097] rounded-full text-white shadow-sm/50 w-[45px] h-[45px]"
            onClick={() => {
              const currentQ = searchParams.get("q") || "";
              const cleanParams = new URLSearchParams();
              if (currentQ) cleanParams.set("q", currentQ);
              submit(cleanParams);
            }}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </Form>
      </div>
    </div>
  );
}
