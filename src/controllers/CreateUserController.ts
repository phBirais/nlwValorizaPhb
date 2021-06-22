import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService";

// -> server -> controller -> service -> ...

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body; //pega a requisição

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin });

    return response.json(user); //envia pro service
  }

}

export { CreateUserController }