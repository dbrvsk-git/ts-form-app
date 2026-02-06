import "./style.css";

// Definice typu pro uživatele
// TypeScript teď ví, jak má vypadat objekt user
type User = {
  name: string;
  email: string;
  age: number;
};

// Najdeme formulář v HTML a řekneme TypeScriptu, že jde o HTMLFormElement
const form = document.getElementById("registrationForm") as HTMLFormElement;

// Najdeme div, kam budeme vypisovat výsledek nebo chyby
const output = document.getElementById("output") as HTMLDivElement;

// Posloucháme odeslání formuláře
form.addEventListener("submit", (e) => {
  // Zabrání reloadu stránky po odeslání
  e.preventDefault();

  // Načtení hodnot z inputů
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const age = (document.getElementById("age") as HTMLInputElement).value;

  const user: User = {
    name,
    email,
    age: Number(age),
  };

  // Zavoláme funkci na validaci dat
  const errors = validateUser(user);

  // Pokud existují chyby, zobrazíme je a skončíme
  if (errors.length > 0) {
    output.innerHTML = errors.join("<br>");
    return;
  }

  // Pokud je vše OK, vypíšeme uživatele
  output.innerHTML = `
Uživatel vytvořen: <br>
Jméno: ${user.name} <br>
E-mail: ${user.email} <br>
Věk: ${user.age}
`;

  console.log("Odeslaný user:", user);
});

// Funkce pro validaci uživatele
// Vrací pole chybových hlášek (string[])
function validateUser(user: User): string[] {
  const errors: string[] = [];

  // Kontrola jména
  if (user.name.trim().length < 3) {
    errors.push("Jméno musí mít alespoň 3 znaky.");
  }

  // Kontrola emailu (velmi jednoduchá)
  if (!user.email.includes("@")) {
    errors.push("Neplatný tvar e-mailu.");
  }

  // Kontrola věku
  if (user.age < 18) {
    errors.push("Uživateli musí být více jak 18 let.");
  }

  return errors;
}
