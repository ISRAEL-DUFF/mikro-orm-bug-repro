import {
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
    Unique,
  } from "@mikro-orm/core";
  
  import { v4 as genUuidV4 } from "uuid";
  import { Chat } from "./chat.entity";
  
  @Entity()
  @Unique({ properties: ["category", "messageTag"] })
  export class Forum {
    @PrimaryKey({ nullable: false })
    id = genUuidV4();
  
    @ManyToOne(() => Chat, {
      nullable: true,
      onDelete: "cascade",
    })
    chat?: Chat;
  
    @Property({ nullable: true })
    category?: string;
  
    @Property({ nullable: true })
    messageTag?: string;
  
    @Property({ nullable: true, unique: true })
    forumTag?: string;
  }
  