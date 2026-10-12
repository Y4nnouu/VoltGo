import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header.jsx";
import { Phoneheader } from "../components/PhoneHeader.jsx";
import { ErrorMessage } from "../components/errorMessage";
import { useState, useEffect } from "react";

export default function MainLayout() {
  const [globalError, setGlobalError] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Vérifie si l'utilisateur est connecté au chargement
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        
        setUser(data.user || null); 
      })
      .catch(err => console.error("Erreur auth:", err));
  }, [location.pathname]); 

  return (
    <main>
      <ErrorMessage
        message={globalError}
        onClose={() => setGlobalError(null)}
      />

      <div className="block lg:hidden">
        <Phoneheader user={user} /> 
      </div>
      <div className="hidden lg:block">
        <Header user={user} />  
      </div>

      <Outlet context={[setGlobalError, setUser, user]} />
    </main>
  );
}
