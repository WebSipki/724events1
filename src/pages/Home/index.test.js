import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  })
});

describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );
      render(<Home />);

      // Remplir les champs requis
        fireEvent.change(await screen.findByLabelText("Nom"), {
          target: { value: "Dupont" },
        });
        fireEvent.change(await screen.findByLabelText("Prénom"), {
          target: { value: "Jean" },
        });
        fireEvent.change(await screen.findByLabelText("Email"), {
          target: { value: "jean.dupont@example.com" },
        });
        fireEvent.change(await screen.findByLabelText("Message"), {
          target: { value: "Bonjour, ceci est un message." },
        });
        fireEvent.click(screen.getAllByTestId("collapse-button-testid")[0]);
        screen.debug();
        fireEvent.click(await screen.findByText("Personnel"));
        fireEvent.click(await screen.findByText("Envoyer"));

        screen.debug(); // ← pour voir ce qui est affiché

      expect(await screen.findByText(/votre message a bien été envoyé/i)).toBeInTheDocument();

      
  
    });
  }
);


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
