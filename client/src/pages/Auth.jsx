import { useState } from "react";
import { Form, useActionData, useOutletContext} from "react-router-dom";

export default function Auth() {
  const [setGlobalError, setUser] = useOutletContext();
  const [isLogin, setIsLogin] = useState(true);
  const actionData = useActionData();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#252e2d] px-4 py-20 lg:py-0">
      <div className="bg-white rounded-[30px] lg:rounded-[40px] shadow-2xl w-full max-w-[450px] p-6 sm:p-10 lg:p-12 transition-all duration-500">
        
        <div className="flex flex-col items-center mb-6 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#252e2d]">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h2>
          <p className="text-gray-500 font-medium mt-2 text-sm sm:text-base">
            {isLogin 
              ? "Accédez aux bornes de France" 
              : "Rejoignez la communauté VoltGo"}
          </p>
        </div>

       
        <Form method="post" action="/portail" className="flex flex-col gap-4 sm:gap-6">
          
          
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="font-bold ml-1 text-[#252e2d] text-sm sm:text-base">Prénom</label>
              <input
                type="text"
                name="nom"
                placeholder="Yann"
                className=" placeholder-gray-500 bg-gray-100 p-3.5 sm:p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#23D097] transition-all text-sm sm:text-base"
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-bold ml-1 text-[#252e2d] text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              className=" placeholder-gray-500 bg-gray-100 p-3.5 sm:p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#23D097] transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold ml-1 text-[#252e2d] text-sm sm:text-base">Mot de passe</label>
            <input
              type="password"
              name="mdp"
              placeholder="Votre mot de passe"
              className=" placeholder-gray-500 bg-gray-100 p-3.5 sm:p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#23D097] transition-all text-sm sm:text-base"
              required
            />
          </div>

         
          {actionData?.error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-center font-bold text-xs sm:text-sm border border-red-100">
              {actionData.error}
            </div>
          )}

        
          <input type="hidden" name="formulaireType" value={isLogin ? "login" : "register"} />

          <button
            type="submit"
            className="bg-[#23D097] text-[#252e2d] font-black p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mt-4 text-base sm:text-lg"
          >
            {isLogin ? "Se connecter" : "S'inscrire gratuitement"}
          </button>
        </Form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#252e2d] font-bold text-sm sm:text-base underline hover:text-[#23D097] transition-colors"
          >
            {isLogin 
              ? "Pas encore de compte ? S'inscrire" 
              : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}