import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepositories } from "../repositories/TagsRepositories"


class CreateTagService {

  async execute(name: string) {

    const tagsRepositories = getCustomRepository(TagsRepositories);

    //verifica se a tag tem nome
    if (!name) {
      throw new Error("Incorrect name!");
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagAlreadyExists = await tagsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new Error("Tag Already exists");
    }

    //Cria a tag
    const tag = tagsRepositories.create({
      name
    });

    //Salva a tag
    await tagsRepositories.save(tag);

    return tag;
  }

}

export { CreateTagService }