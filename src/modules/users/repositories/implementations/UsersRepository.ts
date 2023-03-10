import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    let user = new User();

    user = {
      ...user,
      name,
      email,
    };

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const updatedUser = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        return updatedUser;
      }

      return user;
    });

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
