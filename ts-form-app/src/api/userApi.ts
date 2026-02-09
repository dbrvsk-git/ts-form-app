import type { User } from "../types/user";
import type { ApiResponse } from "../types/api";

//simulace POST requestu na server
export async function createUser(user: User): Promise<ApiResponse<User>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // simulace chyby
      if (user.email === "dinoprior@gmail.com") {
        resolve({
          error: "Server nepřijal uživatele",
        });
        return;
      }
      resolve({
        data: user,
      });
    }, 1000); // 1s delay jako server
  });
}
