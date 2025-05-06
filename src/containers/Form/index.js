import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false); // Déclaration de messageSent
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null); // Déclaration de formRef

  

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      const formData = new FormData(formRef.current);
      const nom = formData.get("Nom");
      const prenom = formData.get("Prénom");
      const email = formData.get("Email");
      const message = formData.get("Message");
      const selection = formData.get("Personel / Entreprise");

     if (!nom || !prenom || !email || !message || !selection) {
      setErrorMessage("❌ Tous les champs doivent être remplis !");
       setSending(false);
       return;
     }

     setErrorMessage(""); // Réinitialiser le message s’il n’y a pas d’erreur
     // Appel à l'API
      try {
        await mockContactApi();
        setSending(false);
        setMessageSent(true); // afficher confirmation
        formRef.current.reset(); // ← reset du formulaire
        onSuccess(); // Appel de la fonction de succès
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },

    [onSuccess, onError]
  );
  return (
    <>
    <form onSubmit={sendContact} ref={formRef}> {/* Assure-toi d'utiliser formRef ici */}
      <div className="row">
        <div className="col">
          <Field 
             name="Nom" placeholder="" label="Nom"/>
          <Field 
             name="Prénom" placeholder="" label="Prénom"/>
          <Select
            name="Personel / Entreprise"
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field 
              name="Email"placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="Message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}  
          />
        </div>
      </div>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {messageSent && (
      <p className="success-message">✅ Votre message a bien été envoyé !</p>
    )}
  </>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
