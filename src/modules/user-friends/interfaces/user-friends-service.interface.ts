import { ResponseDto } from "../../../common/response.dto";
import {
  IInfoFriend,
  IInfoFriendUser,
} from "./user-friends-repository.interface";

export interface IUserFriendsService {
  getUserFriendsByUserId(
    userId: string
  ): Promise<ResponseDto<IInfoFriendUser[] | null>>;

  getFriendByFriendIdAndFriendId(
    userId: string,
    friendId: string
  ): Promise<ResponseDto<IInfoFriend | null>>;
}
