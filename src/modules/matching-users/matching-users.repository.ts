import { Brackets, EntityRepository, Repository } from "typeorm";
import { FriendDto } from "../users/dto/friend.dto";
import { MatchingUsersEntity } from "./entities/matching-users.entity";
import { IMatchingUsersRepository } from "./interfaces";

@EntityRepository(MatchingUsersEntity)
export class MatchingUsersRepository
  extends Repository<MatchingUsersEntity>
  implements IMatchingUsersRepository {
  async getListFriends(id: string): Promise<string[]> {
    try {
      const query = this.createQueryBuilder("matching_users").andWhere(
        new Brackets((qb) => {
          qb.where(`matching_users.friendId = '${id}'`).orWhere(
            `matching_users.userId ='${id}'`
          );
        })
      );
      console.log(query.getSql());
      const result = await query.getMany();
      const listFriendsId = result.map((item) => {
        if (item.friendId !== id) return item.friendId;
        if (item.userId !== id) return item.userId;
      });

      return listFriendsId;
    } catch (error) {
      console.log(error);
    }
  }
  getById(id: number): Promise<MatchingUsersEntity> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<MatchingUsersEntity[]> {
    throw new Error("Method not implemented.");
  }
}
