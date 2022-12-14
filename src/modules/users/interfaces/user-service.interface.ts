import { ResponseToken } from "../../auth/interfaces/response-token.interface";
import { ResponsePublicUserInterface } from "./res-public-user.interface";

import { ResponseDto } from "../../../common/response.dto";
import { SocialDTO } from "../../auth/dto/social-login.dto";
import { UpdateUserDto, UserProfileDto, VerifyUserDto } from "../dto";
import { UserResponeDTO } from "../dto/user-respone.dto";
import { UserResponseAdminDto } from "../dto/user-response-admin.dto";
import { PageOptionsDto } from "../../../common/dto";
import { IResponsePagination } from "../../../common/interfaces/page-meta-dto-parameters.interface";

export interface IUserService {
  getAllUser(
    pageOptionsDto: PageOptionsDto
  ): Promise<ResponseDto<IResponsePagination | string>>;
  getPublicById(
    userId: string
  ): Promise<ResponseDto<ResponsePublicUserInterface | null>>;

  verifyUser(dto: VerifyUserDto): Promise<ResponseDto<null>>;
  verifyUserByEmail(email: string): Promise<ResponseDto<boolean | null>>;
  signUp(
    user: SocialDTO
  ): Promise<
    ResponseDto<ResponseToken | string | boolean | null | UserResponeDTO>
  >;
  updateUserProfileById(
    userId: string,
    user: UpdateUserDto,
    file: Express.Multer.File
  ): Promise<ResponseDto<string | UserProfileDto>>;
  // deleteUserProfileById(
  //   userId: string,
  //   user: DeleteUserDto
  // ): Promise<ResponseDto<UserEntity | null>>;
}
