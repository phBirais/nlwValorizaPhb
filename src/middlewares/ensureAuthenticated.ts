import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  //Receber o token
  const authToken = request.headers.authorization
  //console.log(token);

  //---Validar se token esta preenchido------------------------------------------------
  if (!authToken) { //se token voltar vazio, retorna não autorizado
    return response.status(401).end();
  }

  //---Validar se toke é valido ---------------------------------------

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "019cb62eafdeb0bd6415c038674d516c") as IPayload;
    //console.log(decode);

    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).end();
  }

  //Recuperar informações do usuário


}