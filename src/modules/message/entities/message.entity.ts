import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'messages' })
export class Message {
    @PrimaryKey()
    message_id?: number;

    @Property()
    sender_id!: number;

    @Property()
    receiver_id!: number;

    @Property()
    subject!: string;

    @Property()
    content!: string;

    @Property({ onCreate: () => new Date() })
    sent_date?: Date;

    @Property({ default: false })
    read: boolean = false;
}
