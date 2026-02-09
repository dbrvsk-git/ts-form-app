import type { User } from "../types/user";

// klíč pod kterým ukládáme data v prohlížeči
const STORAGE_KEY = "users";

// pole uživatelů v paměti aplikace
let users: User[] = [];

/**
 * Načte uživatele z localStorage při startu aplikace
 * pokud tam žádní nejsou, zůstane prázdné pole
 */
export function loadUsers(): void {
  const data = localStorage.getItem(STORAGE_KEY);

  // pokud nic není uložené, končíme
  if (!data) return;

  try {
    // JSON string -> objekt
    users = JSON.parse(data);
  } catch {
    // pokud jsou data poškozená, smažeme je
    users = [];
  }
}

/**
 * Uloží aktuální pole uživatelů do localStorage
 */
function saveUsers(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/**
 * Přidá uživatele do pole a uloží ho do storage
 */
export function addUser(user: User): void {
  users.push(user);
  saveUsers();
}

/**
 * Vrací všechny uživatele
 */
export function getUsers(): User[] {
  return users;
}
