import { Form, useSubmit, useSearchParams } from "react-router-dom";

/**
 * Barre de recherche adresse
 * Strictement ton code d’origine
 */
export default function SearchBar() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        const formParam = new FormData(e.currentTarget);
        const updateQ = formParam.get("q") || "";
        const updateUrl = new URLSearchParams(searchParams);
        updateUrl.set("q", updateQ);
        submit(updateUrl);
      }}
      className="flex bg-white rounded-full shadow-2xl/100"
    >
      <input
        className="w-full ps-2 sm:ps-5 rounded-full pt-2.5 pb-2.5 text-[13px] sm:text-lg placeholder-gray-500 outline-none"
        type="text"
        name="q"
        placeholder="Où souhaitez-vous recharger ?"
      />

      <button
        type="submit"
        className="w-13 p-2.2 md:p-4 md:w-17 rounded-full bg-[#23D097] scale-85 shadow-2xl cursor-pointer hover:scale-100 transition-all duration-300 active:scale-85"
      >
        <i className="fa-solid fa-magnifying-glass text-lg"></i>
      </button>
    </Form>
  );
}
