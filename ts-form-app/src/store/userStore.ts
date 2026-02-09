import type { User } from "../types/user";

// jednoduchý in-memory store
// ve frameworku by to byl state (React, Vue…)

const users: User[] = [];

//pridani uzivatele
export function addUser(user: User): void {
  users.push(user);
}

// vrácení všech uživatelů

export function getUsers(): User[] {
  return users;
}
