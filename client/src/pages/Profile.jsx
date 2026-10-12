import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const [setGlobalError, setUser, user] = useOutletContext();
  const navigate = useNavigate();

  const [nom, setNom] = useState(user?.nom || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mdp, setMdp] = useState("");
  const [mdpConfirm, setMdpConfirm] = useState("");

  
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/portail");
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" }); // Reset le message

    // Vérification mot de passe côté Front avant d'envoyer
    if (mdp && mdp !== mdpConfirm) {
      setStatus({
        type: "error",
        message: "Les mots de passe ne correspondent pas !",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/update-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nom, email, mdp, mdpConfirm }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setMdp("");
        setMdpConfirm("");
        setStatus({
          type: "success",
          message: "Profil mis à jour avec succès !",
        });

        setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Une erreur est survenue",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Impossible de contacter le serveur",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#252e2d] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow-xl">
        <h1 className="text-2xl font-black text-[#252e2d] mb-8 text-center">
          Mon Compte
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-gray-500 text-xs font-bold uppercase ml-1">
              Nom
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#23D097] font-semibold text-[#252e2d]"
            />
          </div>

          <div>
            <label className="text-gray-500 text-xs font-bold uppercase ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#23D097] font-semibold text-[#252e2d]"
            />
          </div>

          <div className="border-t pt-4 mt-2">
            <label className="text-gray-500 text-xs font-bold uppercase ml-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              placeholder="Votre nouveau mot de passe"
              className="w-full mt-1 p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#23D097] font-semibold placeholder-gray-400"
            />
            <p className="text-[10px] text-gray-500 mt-1 ml-1">
              Doit contenir minimum : 8 caracteres, 1 Maj, 1 Chiffre, 1 Spécial 
            </p>
          </div>

          <div>
            <label className="text-gray-500 text-xs font-bold uppercase ml-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={mdpConfirm}
              onChange={(e) => setMdpConfirm(e.target.value)}
              placeholder="Confirmer le mot de passe"
              className="w-full mt-1 p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#23D097] font-semibold placeholder-gray-400"
            />
          </div>

          {/* Affichage du statut */}
          {status.message && (
            <div
              className={`text-center p-3 rounded-xl font-bold text-sm ${
                status.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#23D097] text-[#252e2d] font-bold py-3 rounded-xl mt-4 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
          >
            Enregistrer les modifications
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-red-500 font-bold py-2 hover:underline transition-all text-sm mt-2"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
