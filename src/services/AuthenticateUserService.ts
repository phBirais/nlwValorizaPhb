import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}


class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    //Verificar se email existe
    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    //verificar se senha esta correta
    const passwordMatch = compare(password, user.password); //retorna bool

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //gerar token
    const token = sign(
      {
        email: user.email
      },
      "019cb62eafdeb0bd6415c038674d516c", //hash = pedronodenlwvaloriza
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );
    return token;
  }

}

export { AuthenticateUserService }