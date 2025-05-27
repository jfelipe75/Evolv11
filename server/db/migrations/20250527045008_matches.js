/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("player_match_reviews", function (table) {
    table.increments("id").primary();
    table
      .integer("player_id")
      .unsigned()
      .references("id")
      .inTable("players")
      .onDelete("CASCADE");
    table
      .integer("match_id")
      .unsigned()
      .references("id")
      .inTable("matches")
      .onDelete("CASCADE");

    table.integer("minutes_played").defaultTo(0);
    table.integer("goals").defaultTo(0);
    table.integer("assists").defaultTo(0);
    table.integer("chances_created").defaultTo(0);
    table.integer("tackles").defaultTo(0);
    table.integer("interceptions").defaultTo(0);
    table.integer("saves").defaultTo(0);
    table.decimal("coach_rating", 4, 2).defaultTo(0); // From 1.00 to 10.00
    table.text("notes");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("player_match_reviews");
};
