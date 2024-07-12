export function up(knex) {
    return knex.schema.createTable('sources', function(table) {
        table.increments();
        table.string('source_name').notNullable();
        table.string('source_url').notNullable();
        table.string('source_logo');
    })
}

export function down(knex) {
    return knex.schema.dropTable('sources');
}
