/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lineups", function (table) {
    table.increments("id").primary();
    table
      .integer("match_id")
      .unsigned()
      .references("id")
      .inTable("matches")
      .onDelete("CASCADE");
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");
    table.string("formation"); // e.g., "4-3-3"

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lineups");
};
