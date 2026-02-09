import type { User } from "../types/user.ts";
import { validateUser } from "../utils/validateUser";
import { addUser } from "../store/userStore";
import { renderUserList } from "./userList";
import { createUser } from "../api/userApi";

// Funkce která připojí chování k formuláři
export function setupRegistrationForm(): void {
  // Najdeme formulář
  const form = document.getElementById("registrationForm") as HTMLFormElement;

  // Najdeme výstupní div
  const output = document.getElementById("output") as HTMLDivElement;

  // Posloucháme submit
  form.addEventListener("submit", async (e) => {
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

    // 🌀 loading stav
    output.innerHTML = "Odesílám data na server...";

    try {
      const response = await createUser(user);

      // error ze serveru
      if (response.error) {
        output.innerHTML = response.error;
        return;
      }
      // ✅ success
      addUser(user);
      renderUserList();

      output.innerHTML = `
      Uživatel vytvořen:<br>
      Jméno: ${user.name}<br>
      Email: ${user.email}<br>
      Věk: ${user.age}
    `;
    } catch (err) {
      output.innerHTML = "Neočekávaná chyba aplikace.";
    }
    console.log("Odeslaný user:", user);
  });
}
