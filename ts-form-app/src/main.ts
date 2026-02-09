import "./style.css";

import { setupRegistrationForm } from "./dom/formHandlers";
import { loadUsers } from "./store/userStore";
import { renderUserList } from "./dom/userList";

/**
 * Start aplikace
 * načteme uživatele z localStorage
 * vykreslíme seznam
 * nastavíme formulář
 */
loadUsers();
renderUserList();
setupRegistrationForm();
