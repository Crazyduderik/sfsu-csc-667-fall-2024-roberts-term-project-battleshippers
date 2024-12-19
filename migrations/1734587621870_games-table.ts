import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("games", {
        id: "id",
        status: {
            type: "varchar(20)",
            notNull: true,
            default: "waiting",
        },
        winner_id: {
            type: "integer",
            notNull: true,
            onDelete: "SET NULL",
        },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
            notNull: true,
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("games");
}
