export function up(knex) {
  return knex.schema.createTable('articles', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('image').notNullable();
    table.string('image_alt_text').notNullable();
    table.string('category_primary');
    table.string('category_secondary');
    table.string('link').notNullable();
    table.timestamp('pub_date').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('source_id').references('id').inTable('sources');
  });
}

export function down(knex) {
  return knex.schema.dropTable('articles');
}
