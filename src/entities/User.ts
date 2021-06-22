import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"; //v4 = ids randomicos

@Entity("users")//nome da tabela
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) { //se não tiver id ainda
      this.id = uuid();
    }
  }

}

export { User };


// Entidade < - > ORM < - > BD(Users)