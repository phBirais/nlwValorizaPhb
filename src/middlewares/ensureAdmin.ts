import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const { user_id } = request;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id) as User;

  // Verificar se usuario admin

  if (admin) {
    return next();
  }
  //401 - unauthorized
  return response.status(401).json({
    error: "Unauthorized",
  });
}