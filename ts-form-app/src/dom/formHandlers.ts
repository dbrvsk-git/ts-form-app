import type { User } from "../types/user.ts";
import { validateUser } from "../utils/validateUser";
import { addUser } from "../store/userStore";
import { renderUserList } from "./userList";

// Funkce která připojí chování k formuláři
export function setupRegistrationForm(): void {
  // Najdeme formulář
  const form = document.getElementById("registrationForm") as HTMLFormElement;

  // Najdeme výstupní div
  const output = document.getElementById("output") as HTMLDivElement;

  // Posloucháme submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Načtení hodnot
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const age = Number(
      (document.getElementById("age") as HTMLInputElement).value,
    );

    const user: User = {
      name,
      email,
      age,
    };

    // validace
    const errors = validateUser(user);

    if (errors.length > 0) {
      output.innerHTML = errors.join("<br>");
      return;
    }

    // přidání do store
    addUser(user);

    // vykreslení seznamu
    renderUserList();

    // info
    output.innerHTML = "Uživatel úspěšně přidán.";

    output.innerHTML = `
      Uživatel vytvořen:<br>
      Jméno: ${user.name}<br>
      Email: ${user.email}<br>
      Věk: ${user.age}
    `;

    console.log("Odeslaný user:", user);
  });
}
