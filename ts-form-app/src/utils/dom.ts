/**
 * Vrátí DOM element a typově ho zúží
 * pokud element neexistuje → vyhodí chybu
 *
 * T = typ elementu (HTMLInputElement, HTMLFormElement...)
 */

export function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);

  // kdyz element neni nalezen -> fail fast
  if (!el) {
    throw new Error(`Element s id "${id}" neexistuje`);
  }
  return el as T;
}
