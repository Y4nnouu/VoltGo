import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsBorne() {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const borneData = location.state?.borneData;
    const records = location.state?.records;

    if (!borneData || !records) {
      setError("Impossible de charger la borne. Revenez à la carte.");
      return;
    }

    const id_station_itinerance = borneData.fields?.id_station_itinerance || id;

    fetch(`http://localhost:3000/api/borne/details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_station_itinerance,
        records,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          setError(resData.error);
        } else {
          setData(resData);
        }
      })
      .catch(() => {
        setError("Erreur serveur lors du chargement.");
      });
  }, [id, location.state]);

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-bold">{error}</p>
        <Link to="/map" className="text-[#23D097] underline">
          Retour à la carte
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <Link
        to="/map"
        className="inline-flex items-center gap-2 text-[#23D097] hover:text-[#1eb885] font-semibold mb-6"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Retour à la carte
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-black text-[#252e2d] mb-2">{data.nom}</h1>
        <p className="text-gray-600 text-lg mb-6 flex items-center gap-2">
          <i className="fa-solid fa-location-dot text-[#23D097]"></i>
          {data.adresse}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Opérateur */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
              Opérateur
            </h3>
            <p className="text-xl font-extrabold text-[#188F67]">
              {data.operateur}
            </p>
          </div>

          {/* Points de charge */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
              Points de charge
            </h3>
            <p className="text-xl font-extrabold text-[#188F67]">
              {data.nb_points_charge}{" "}
              {data.nb_points_charge > 1 ? "prises" : "prise"}
            </p>
          </div>

          {/* Puissances */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
              <i className="fa-solid fa-bolt text-[#23D097]"></i> Puissances
              disponibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.puissances.map((p, idx) => (
                <span
                  key={idx}
                  className="bg-[#23D097] text-white px-3 py-1 rounded-full font-bold text-sm"
                >
                  {p} kW
                </span>
              ))}
            </div>
          </div>

          {/* Types de prises */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
              <i className="fa-solid fa-plug text-[#23D097]"></i> Types de
              prises
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.types_prises.map((type, idx) => (
                <span
                  key={idx}
                  className="bg-[#252e2d] text-white px-3 py-1 rounded-full font-semibold text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Horaires */}
          {data.horaires && (
            <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                <i className="fa-regular fa-clock text-[#23D097]"></i> Horaires
              </h3>
              <p className="text-lg font-semibold text-[#252e2d]">
                {data.horaires}
              </p>
            </div>
          )}

          {/* Modes de paiement */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
              <i className="fa-solid fa-credit-card text-[#23D097]"></i> Modes
              de paiement
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.paiement_cb && (
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                  <i className="fa-solid fa-credit-card text-[#188F67]"></i>
                  <span className="font-semibold text-[#252e2d]">
                    Carte Bancaire
                  </span>
                </div>
              )}
              {data.paiement_acte && (
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                  <i className="fa-solid fa-wallet text-blue-600"></i>
                  <span className="font-semibold text-[#252e2d]">
                    Paiement à l'acte
                  </span>
                </div>
              )}
              {data.paiement_autre && (
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
                  <i className="fa-solid fa-mobile-alt text-purple-600"></i>
                  <span className="font-semibold text-[#252e2d]">
                    Autre (Badge, App...)
                  </span>
                </div>
              )}
              {!data.paiement_cb &&
                !data.paiement_acte &&
                !data.paiement_autre && (
                  <p className="text-gray-500 italic">
                    Informations non disponibles
                  </p>
                )}
            </div>
          </div>

          {/* Accessibilité PMR */}
          {data.acces_pmr && (
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                <i className="fa-solid fa-wheelchair text-[#23D097]"></i>{" "}
                Accessibilité
              </h3>
              <p className="text-lg font-semibold text-[#252e2d]">
                {data.acces_pmr}
              </p>
            </div>
          )}

          {/* Condition d'accès */}
          {data.condition_acces && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                <i className="fa-solid fa-door-open text-[#23D097]"></i> Accès
              </h3>
              <p className="text-lg font-semibold text-[#252e2d]">
                {data.condition_acces}
              </p>
            </div>
          )}

          {/* Type d'implantation */}
          {data.implantation && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                <i className="fa-solid fa-map-marker-alt text-[#23D097]"></i>{" "}
                Implantation
              </h3>
              <p className="text-lg font-semibold text-[#252e2d]">
                {data.implantation}
              </p>
            </div>
          )}

          {/* Date de mise en service */}
          {data.date_service && (
            <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                <i className="fa-solid fa-calendar text-[#23D097]"></i> Mise en
                service
              </h3>
              <p className="text-lg font-semibold text-[#252e2d]">
                {new Date(data.date_service).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          <div className="md:col-span-2 flex flex-wrap gap-3">
            {data.gratuit && (
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                <i className="fa-solid fa-gift text-yellow-600"></i>
                <span className="font-semibold text-[#252e2d]">
                  Recharge Gratuite
                </span>
              </div>
            )}
            {data.reservation && (
              <div className="flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-lg">
                <i className="fa-solid fa-calendar-check text-indigo-600"></i>
                <span className="font-semibold text-[#252e2d]">
                  Réservation possible
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
