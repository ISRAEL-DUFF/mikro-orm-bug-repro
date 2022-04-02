import { Migration } from '@mikro-orm/migrations';

export class Migration20220402061050 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "chat" ("id" varchar(255) not null, "owner_id" varchar(255) not null, "message" varchar(255) not null, "parent_chat_id" varchar(255) null);');
    this.addSql('alter table "chat" add constraint "chat_pkey" primary key ("id");');

    this.addSql('create table "forum" ("id" varchar(255) not null, "chat_id" varchar(255) null, "category" varchar(255) null, "message_tag" varchar(255) null, "forum_tag" varchar(255) null);');
    this.addSql('alter table "forum" add constraint "forum_forum_tag_unique" unique ("forum_tag");');
    this.addSql('alter table "forum" add constraint "forum_category_message_tag_unique" unique ("category", "message_tag");');
    this.addSql('alter table "forum" add constraint "forum_pkey" primary key ("id");');

    this.addSql('create table "message_thread" ("id" varchar(255) not null, "forum_id" varchar(255) null, "user_id" varchar(255) null, "chat_id" varchar(255) null, "interval" smallint not null, "likes" int not null);');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_chat_id_unique" unique ("interval", "chat_id");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_user_id_unique" unique ("interval", "user_id");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_forum_id_unique" unique ("interval", "forum_id");');
    this.addSql('alter table "message_thread" add constraint "message_thread_pkey" primary key ("id");');

    this.addSql('alter table "chat" add constraint "chat_parent_chat_id_foreign" foreign key ("parent_chat_id") references "chat" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "forum" add constraint "forum_chat_id_foreign" foreign key ("chat_id") references "chat" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "message_thread" add constraint "message_thread_forum_id_foreign" foreign key ("forum_id") references "forum" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message_thread" add constraint "message_thread_chat_id_foreign" foreign key ("chat_id") references "chat" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "chat" drop constraint "chat_parent_chat_id_foreign";');

    this.addSql('alter table "forum" drop constraint "forum_chat_id_foreign";');

    this.addSql('alter table "message_thread" drop constraint "message_thread_chat_id_foreign";');

    this.addSql('alter table "message_thread" drop constraint "message_thread_forum_id_foreign";');

    this.addSql('drop table if exists "chat" cascade;');

    this.addSql('drop table if exists "forum" cascade;');

    this.addSql('drop table if exists "message_thread" cascade;');
  }

}
