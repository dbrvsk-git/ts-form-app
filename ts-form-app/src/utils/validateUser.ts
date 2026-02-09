import type { User } from "../types/user";

// Funkce pro validaci uživatele
// Vrací pole chybových hlášek
export function validateUser(user: User): string[] {
  const errors: string[] = [];

  // Kontrola jména
  if (user.name.trim().length < 3) {
    errors.push("Jméno musí mít alespoň 3 znaky.");
  }

  // Kontrola emailu
  if (!user.email.includes("@")) {
    errors.push("Email není platný.");
  }

  // Kontrola věku
  if (user.age < 18 || isNaN(user.age)) {
    errors.push("Uživateli musí být alespoň 18 let.");
  }

  return errors;
}
