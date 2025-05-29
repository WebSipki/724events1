import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

jest.mock("../../api/contact", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
}));

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("Form submission", () => {
    it("calls onSuccess after mock API resolves", async () => {
      const onSuccess = jest.fn();

      
      render(<Form onSuccess={onSuccess} />);

     // Remplissage des champs obligatoires
      fireEvent.change(screen.getByLabelText("Nom"), {
        target: { value: "Durand" },
      });
      fireEvent.change(screen.getByLabelText("Prénom"), {
        target: { value: "Jean" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "jean.durand@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Message"), {
        target: { value: "Ceci est un message" },
      });
      // Utilise l'interaction correcte pour le champ de type "Select"
      fireEvent.click(screen.getByTestId("collapse-button-testid")); // Ouvre la liste
      fireEvent.click(screen.getByText("Personnel")); // Sélectionne une option
      
      // Soumission du formulaire
      fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
