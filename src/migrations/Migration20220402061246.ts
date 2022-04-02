import { Migration } from '@mikro-orm/migrations';

export class Migration20220402061246 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_chat_id_unique";');
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_user_id_unique";');
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_forum_id_unique";');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_chat_id_unique" unique ("interval", "chat_id");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_user_id_unique" unique ("interval", "user_id");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_forum_id_unique" unique ("interval", "forum_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_chat_id_unique";');
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_user_id_unique";');
    this.addSql('alter table "message_thread" drop constraint "message_thread_interval_forum_id_unique";');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_chat_id_unique" unique ("chat_id", "interval");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_user_id_unique" unique ("user_id", "interval");');
    this.addSql('alter table "message_thread" add constraint "message_thread_interval_forum_id_unique" unique ("forum_id", "interval");');
  }

}
