// Imports de React Router pour gérer la navigation
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

// Imports des différentes pages de l'application
import Home from "./pages/Home.jsx";
import Map from "./pages/Map.jsx";
import Auth from "./pages/Auth.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Profile from "./pages/Profile.jsx";
import DetailsBorne from "./pages/DetailsBorne.jsx";

// Fonction pour gérer la connexion et l'inscription
const authAction = async ({ request }) => {
  // Récupère les données du formulaire
  const formData = await request.formData();
  const formulaireType = formData.get("formulaireType"); // "login" ou "register"

  // Prépare les données à envoyer au backend
  const data = {
    email: formData.get("email"),
    mdp: formData.get("mdp"),
  };

  // Si c'est une inscription, on ajoute le nom
  if (formulaireType === "register") {
    data.name = formData.get("nom");
  }

  // Définit la route backend selon le type de formulaire
  const routeCible =
    formulaireType === "login" ? "/api/auth/login" : "/api/auth/register";

  try {
    // Envoie les données au backend
    const response = await fetch(`http://localhost:3000${routeCible}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Envoie les cookies de session
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Si erreur, on renvoie le message d'erreur
    if (!response.ok) {
      return { error: result.error || "Identifiants incorrects" };
    }

    // Si succès, on redirige vers l'accueil
    return redirect("/");
  } catch (err) {
    console.error("Erreur fetch:", err);
    return { error: "Le serveur ne répond pas." };
  }
};

// Configuration de toutes les routes de l'application
const router = createBrowserRouter([
  {
    path: "/", // Route principale
    element: <MainLayout />, // Layout qui entoure toutes les pages
    errorElement: <ErrorPage />, // Page affichée en cas d'erreur
    children: [
      // Page d'accueil
      { index: true, element: <Home /> },
      
      // Page de connexion/inscription
      {
        path: "/portail",
        element: <Auth />,
        action: authAction, // Fonction appelée quand le formulaire est soumis
      },
      
      // Page de profil utilisateur
      {
        path: "/profil",
        element: <Profile />,
      },
      
      // Page détails d'une borne 
      {
        path: "/bornes/:id",
        element: <DetailsBorne />,
      },
      
      // Page carte avec liste des bornes
      {
        path: "/map",
        element: <Map />,
        // Fonction qui charge les données avant d'afficher la page
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const params = url.searchParams; // Récupère les paramètres de recherche
          
          try {
            // Appelle le backend pour récupérer les bornes
            const response = await fetch(
              `http://localhost:3000/api/search?${params.toString()}`
            );
            return await response.json();
          } catch (err) {
            // Si erreur serveur, renvoie des valeurs par défaut
            return {
              Bornes: [],
              latitude: 46.6, // Centre de la France
              longitude: 2.2,
              zoom: 5,
              error: "Serveur hors ligne",
            };
          }
        },
      },
    ],
  },
]);

// Composant principal qui active le routeur
export default function App() {
  return <RouterProvider router={router} />;
}