import { Request, Response } from "express";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(
    private listAllUsersUseCase: ListAllUsersUseCase,
    private usersRepository: IUsersRepository
  ) {}

  handle(request: Request, response: Response): Response {
    const { id } = request.headers;
    const user_id = String(id);

    const all = this.listAllUsersUseCase.execute({ user_id });

    // #TODO: Refactor this
    if (!all) {
      return response.status(400).json({ error: "Unauthorized" });
    }

    return response.json(all);
  }
}

export { ListAllUsersController };
