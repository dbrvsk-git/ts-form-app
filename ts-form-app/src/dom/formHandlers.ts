import type { User } from "../types/user.ts";
import { validateUser } from "../utils/validateUser";
import { addUser } from "../store/userStore";
import { renderUserList } from "./userList";
import { createUser } from "../api/userApi";
import { getElement } from "../utils/dom";

/**
 * Funkce která připojí chování k formuláři
 * spouští se při startu aplikace
 */
export function setupRegistrationForm(): void {
  /**
   * Získání DOM elementů pomocí typed helperu
   * už žádné "as HTMLInputElement" po celém kódu
   */
  const form = getElement<HTMLFormElement>("registrationForm");
  const output = getElement<HTMLDivElement>("output");

  const nameInput = getElement<HTMLInputElement>("name");
  const emailInput = getElement<HTMLInputElement>("email");
  const ageInput = getElement<HTMLInputElement>("age");

  const submitBtn = getElement<HTMLButtonElement>("submitBtn");

  /**
   * REALTIME VALIDACE
   * kontroluje formulář při každém psaní
   */
  function validateFormLive(): void {
    const user: User = {
      name: nameInput.value,
      email: emailInput.value,
      age: Number(ageInput.value),
    };

    const errors = validateUser(user);

    // pokud existují chyby
    if (errors.length > 0) {
      output.innerHTML = errors.join("<br>");
      submitBtn.disabled = true;
      return;
    }

    // pokud je vše OK
    output.innerHTML = "";
    submitBtn.disabled = false;
  }

  /**
   * Napojení realtime validace na inputy
   * spustí se při každém psaní
   */
  nameInput.addEventListener("input", validateFormLive);
  emailInput.addEventListener("input", validateFormLive);
  ageInput.addEventListener("input", validateFormLive);

  /**
   * SUBMIT FORMULÁŘE
   * async protože komunikujeme s API
   */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user: User = {
      name: nameInput.value,
      email: emailInput.value,
      age: Number(ageInput.value),
    };

    const errors = validateUser(user);

    // bezpečnostní validace i při submitu
    if (errors.length > 0) {
      output.innerHTML = errors.join("<br>");
      return;
    }

    /**
     * LOADING STAV
     * deaktivujeme tlačítko
     * změníme text
     */
    submitBtn.disabled = true;
    submitBtn.textContent = "Ukládám...";

    output.innerHTML = "Odesílám data na server...";

    try {
      const response = await createUser(user);

      // chyba ze serveru
      if (response.error) {
        output.innerHTML = response.error;
        return;
      }

      // úspěch
      addUser(user);
      renderUserList();

      output.innerHTML = `
        Uživatel vytvořen:<br>
        Jméno: ${user.name}<br>
        Email: ${user.email}<br>
        Věk: ${user.age}
      `;

      // reset formuláře po úspěchu
      form.reset();
    } catch {
      output.innerHTML = "Neočekávaná chyba aplikace.";
    } finally {
      /**
       * návrat tlačítka do původního stavu
       */
      submitBtn.disabled = false;
      submitBtn.textContent = "Registrovat";
    }

    console.log("Odeslaný user:", user);
  });
}
