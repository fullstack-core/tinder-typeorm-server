import { Repository } from "src/common/repository";
import { createQueryBuilder } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IUserRepository } from "./interfaces/user-repository.interface";

export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository {
  getUserByFullName(fullname: string): Promise<UserEntity> {
    console.log(fullname);
    throw new Error("Method not implemented.");
  }
  create(data: UserEntity): Promise<UserEntity> {
    console.log(data);
    throw new Error("Method not implemented.");
  }
  update(id: number, data: UserEntity): Promise<UserEntity> {
    console.log(id, data);
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<UserEntity> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  async getUserByPhone(phone: string): Promise<UserEntity> {
    try {
      const query = createQueryBuilder(UserEntity).where(
        `${UserEntity}.phone = "${phone}"`
      );
      const result = await query.getOne();
      return result;
    } catch (error) {
      throw { message: error.message };
    }
  }
}
