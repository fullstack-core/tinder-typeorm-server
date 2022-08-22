import { EntityRepository, Repository } from "typeorm";

import { MessageEntity } from "./entities/messages.entity";
import { ConversationEntity } from "./entities/conversations.entity";
import { SocketDeviceEntity } from "./entities/socket-devices.entity";

import { IConversationMessage, IMessage, IChatRepository } from "./interfaces";

@EntityRepository(ConversationEntity)
export class ConversationRepository
  extends Repository<ConversationEntity>
  implements IChatRepository {
  async getConversationsByUserId(
    userId: string
  ): Promise<IConversationMessage[]> {
    const conversationFriends = await this.createQueryBuilder("C")
      .leftJoinAndSelect("C.infoFriend", "infoFriend")
      .leftJoinAndSelect("C.messages", "messages")
      .andWhere(`C.user_id = '${userId}'`)
      .select([
        `C.id as "conversationId", C.friend_id as "friendId", infoFriend.name as name, infoFriend.avatar as avatar, messages.content as content, messages.created_at as "createAt"`,
      ])
      .orderBy("messages.created_at", "DESC")
      .limit(1)
      .getRawMany<IConversationMessage>();

    const conversationUsers = await this.createQueryBuilder("C")
      .leftJoinAndSelect("C.userFriend", "userFriend")
      .leftJoinAndSelect("C.messages", "messages")
      .andWhere(`C.friend_id = '${userId}'`)
      .select([
        `C.id as "conversationId", C.user_id as "friendId", userFriend.name as name, userFriend.avatar as avatar, messages.content as content, messages.created_at as "createAt"`,
      ])
      .orderBy("messages.created_at", "DESC")
      .limit(1)
      .getRawMany<IConversationMessage>();

    return [...conversationFriends, ...conversationUsers];
  }

  async getMessagesByConversationId(
    conversationId: string
  ): Promise<IMessage[]> {
    const messages = await this.createQueryBuilder("C")
      .andWhere(`C.id = '${conversationId}'`)
      .leftJoinAndSelect("C.messages", "messages")
      .select([
        `messages.id as "messageId", messages.sender_id as "senderId", messages.content as content, messages.image as image, messages.created_at as "createAt"`,
      ])
      .orderBy("messages.created_at", "DESC")
      .getRawMany<IMessage>();

    if (!messages[0].messageId) {
      return [];
    }

    return messages;
  }
}

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}

@EntityRepository(SocketDeviceEntity)
export class SocketDeviceRepository extends Repository<SocketDeviceEntity> {}
