import "./style.css";

type User = {
  name: string;
  email: string;
  age: number;
};

const form = document.getElementById("registrationForm") as HTMLFormElement;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const age = (document.getElementById("age") as HTMLInputElement).value;

  const user: User = {
    name,
    email,
    age: Number(age),
  };

  console.log(user);
});
