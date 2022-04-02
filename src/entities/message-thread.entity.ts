import {
    Entity,
    Enum,
    ManyToOne,
    PrimaryKey,
    Property,
    Unique,
  } from "@mikro-orm/core";

import { v4 as genUuidV4 } from "uuid";
import { Forum } from "./forum.entity";
import { Chat } from "./chat.entity";


enum ChatLimitInterval {
  UNKNOWN_MESSAGE_LIMIT_INTERVAL = 0,
  INSTANT_MESSAGE_LIMIT_INTERVAL = 1,
  DAILY_MESSAGE_LIMIT_INTERVAL = 2,
  WEEKLY_MESSAGE_LIMIT_INTERVAL = 3,
  MONTHLY_MESSAGE_LIMIT_INTERVAL = 4
}

@Entity()
@Unique({
  properties: ["interval", "forum"],
})
@Unique({
  properties: ["interval", "userId"],
})
@Unique({
  properties: ["interval", "chat"],
})
export class MessageThread {
    @PrimaryKey({ nullable: false })
    id = genUuidV4();

    @ManyToOne(() => Forum, {
        nullable: true,
        onDelete: "cascade",
      })
      forum?: Forum;
    
      @Property()
      userId?: string;
    
      @ManyToOne(() => Chat, {
        nullable: true,
        onDelete: "cascade",
      })
      chat?: Chat;

      @Enum(() => ChatLimitInterval)
    interval!: ChatLimitInterval;

    @Property()
    likes!: number;
}