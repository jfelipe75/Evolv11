/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("teams", function (table) {
    table.increments("id").primary(); // Team ID
    table.string("name", 100).notNullable();
    table.string("location", 100);
    table.string("club_level", 50);
    table.string("logo_url");
    table.text("description");

    // Tactical attribute scores (0–100)
    table.decimal("team_rating", 5, 2).defaultTo(50.0); // Composite rating
    table.decimal("def_rating", 5, 2).defaultTo(50.0); // Defensive strength
    table.decimal("mid_rating", 5, 2).defaultTo(50.0); // Midfield control
    table.decimal("att_rating", 5, 2).defaultTo(50.0); // Attacking threat

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop any dependent foreign key tables first
  return knex.schema
    .dropTableIfExists("users")
    .then(() => knex.schema.dropTableIfExists("teams"));
};
