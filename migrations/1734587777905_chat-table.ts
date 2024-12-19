import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("chat", {
        id: "id",
        game_id: {
            type: "integer",
            references: "games",
            onDelete: "CASCADE",
        },
        user_id: {
            type: "integer",
            references: "users",
            onDelete: "CASCADE",
        },
        message: {
            type: "text",
            notNull: true,
        },
        sent_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
            notNull: true,
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("chat");
}
