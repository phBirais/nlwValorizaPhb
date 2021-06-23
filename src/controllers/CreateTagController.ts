import { Request, Response } from "express"
import { CreateTagService } from "../services/CreateTagService";

// -> server -> controller -> service -> ...

class CreateTagController {

  async handle(request: Request, response: Response) {

    const { name } = request.body; //pega a requisição

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.json(tag); //envia pro service
  }

}


export { CreateTagController }