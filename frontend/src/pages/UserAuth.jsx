import AuthForm from "../user/AuthForm";
import { useLocation } from "react-router-dom";

export default function UserAuth() {
  const location = useLocation();

  return (
    <header>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            {location.pathname === "/login" ? (
              <>
                <h1 className="text-5xl font-bold ">Jetzt Einloggen!</h1>
                <p className="py-6">
                  Bitte geben Sie Ihre Anmeldeinformationen ein, um
                  fortzufahren.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold">Jetzt Registrieren!</h1>
                <p className="py-6">
                  Erstellen Sie ein Konto, um von den Funktionen von Timely zu
                  profitieren.
                </p>
              </>
            )}
          </div>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <AuthForm pathname={location.pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
