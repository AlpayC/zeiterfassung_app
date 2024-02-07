import axios from "axios";
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputField from "../components/ui/inputFields/InputFieldLogin";
import { UserContext } from "./UserContext";
import FormButton from "../components/ui/buttons/FormButton";
import { AlertContext } from "../context/AlertContext";

export default function AuthForm({ pathname }) {
  const { refetch } = useContext(UserContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const response = await axios.post(`/api/user${pathname}`, data);
      showAlert(
        `${response?.data.message}`,
        `${response?.data.success.message}`,
        "alert-success",
        3000
      );
      setTimeout(() => {
        refetch();
        navigate("/dashboard");
      }, 2200);
    } catch (e) {
      showAlert(
        `${e.response?.data.message}`,
        ` ${e.response?.data.error.message}`,
        "alert-error",
        4000
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="gap-6 flex flex-col items-center justify-center my-12"
      noValidate
    >
      {location.pathname === "/login" ? (
        <>
          <InputField name="email" type="email" placeholder="Deine Email" />
          <InputField
            name="password"
            type="password"
            placeholder="***********"
          />
          <FormButton label={"Anmelden"} type={"submit"} />
          <NavLink to={"/signup"} className={"link link-primary text-center"}>
            Noch kein Konto? Hier registrieren
          </NavLink>
        </>
      ) : (
        <>
          <InputField name="name" type="text" placeholder="Deine Vorname" />
          <InputField name="lastname" type="text" placeholder="Dein Nachname" />
          <InputField name="email" type="email" placeholder="Deine Email" />
          <InputField
            name="password"
            type="password"
            placeholder="***********"
          />
          <FormButton label={"Registrieren"} type={"submit"} />
          <NavLink to={"/login"} className={"link link-primary text-center"}>
            Sie haben bereits ein Benutzerkonto? Hier einloggen
          </NavLink>
        </>
      )}
    </form>
  );
}
