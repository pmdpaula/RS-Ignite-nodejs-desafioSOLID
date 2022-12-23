import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id as string);

    if (!user?.admin && !user) {
      // throw new Error("Unauthorized");
      // return response.status(400).json({ error: "Unauthorized" });
      return null;
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
