import {
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
  } from "@mikro-orm/core";
  
  import { v4 } from "uuid";
  
  @Entity()
  export class Chat {
    @PrimaryKey({ nullable: false })
    id = v4();
  
    @Property({ nullable: false })
    ownerId!: string;
  
    @Property({ nullable: false })
    message!: string;
  
    @ManyToOne({ nullable: true, onDelete: "cascade" })
    parentChat?: Chat;
  }
  