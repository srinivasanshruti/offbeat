/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex('sources').del()
    await knex('sources').insert([
        {id: 1, source_name: 'The Breach', source_url: "https://breachmedia.ca/"},
        {id: 2, source_name: 'The Narwhal', source_url: "https://thenarwhal.ca/"},
    ]);
}
