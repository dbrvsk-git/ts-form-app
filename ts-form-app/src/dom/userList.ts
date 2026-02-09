import { getUsers } from "../store/userStore";

//vykresli seznam uzivatelu do stranky
export function renderUserList(): void {
  const list = document.getElementById("userList") as HTMLDivElement;

  const users = getUsers();

  //pokud nikdo neni registrovany
  if (users.length === 0) {
    list.innerHTML = "Zatím žádní registrovaní uživatelé";
    return;
  }

  //vykresleni seznamu
  list.innerHTML = users
    .map(
      (u) => `
        <div class="user-card">
        <strong>${u.name}</strong><br>
        ${u.email}<br>
        věk: ${u.age}
        </div>
        `,
    )
    .join("");
}
