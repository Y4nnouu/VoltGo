import { useEffect } from "react";

// Composant qui affiche un message d'erreur temporaire en haut de l'écran
export function ErrorMessage({ message, onClose }) {

  // Si pas de message, ne rien afficher
  if (!message) return null;

  // Ferme automatiquement le message après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Appelle la fonction pour fermer le message
    }, 3000); // 3000ms = 3 secondes

    // Nettoie le timer si le composant est modifié avant les 3 secondes
    return () => clearTimeout(timer);
  }, [message, onClose]); // S'exécute quand message ou onClose change

  return (
   
    <div className="fixed top-25 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
     
      <div className="flex items-center gap-3 bg-red-400 p-4 rounded-[20px] shadow-2xl">
    
        <i className="fa-solid fa-circle-exclamation text-white text-xl"></i>
        
      
        <div className="flex-1">
          <p className="text-white font-bold text-lg">Erreur</p>
          <p className="text-white text-sm opacity-90">{message}</p>
        </div>
        
    
        <button 
          onClick={onClose} 
          className="text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-white"></i>
        </button>
      </div>
    </div>
  );
}