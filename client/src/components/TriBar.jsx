export default function TriBar({ listeBornes, value, setValue }) {
  return (
    <div className="text-white flex flex-col sm:flex-row gap-3 text-[13px] sm:text-[18px] lg:flex-row items-center justify-between w-full">
      <h1 className="hidden sm:block">
        {listeBornes.length} Bornes trouvées
      </h1>

      <div>
        <label>Trier par : </label>

        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-white text-[12px] sm:text-[16px] text-black p-1.5 sm:p-2.5 rounded-[15px]"
        >
          <option value="">Choisir</option>
          <option value="operateur">Opérateur (A-Z)</option>
          <option value="puissance">Puissance</option>
          <option value="avis">Avis</option>
        </select>
      </div>
    </div>
  );
}
