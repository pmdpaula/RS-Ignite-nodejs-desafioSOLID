import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    let user = this.usersRepository.findById(user_id);

    if (!user) {
      user = this.usersRepository.findByEmail(user_id);

      if (!user) {
        throw new Error("Unauthorized");
      }
    }

    return user;
  }
}

export { ShowUserProfileUseCase };
