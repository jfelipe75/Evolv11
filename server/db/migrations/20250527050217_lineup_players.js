/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lineup_players", function (table) {
    table.increments("id").primary();

    table
      .integer("lineup_id")
      .unsigned()
      .references("id")
      .inTable("lineups")
      .onDelete("CASCADE");
    table
      .integer("player_id")
      .unsigned()
      .references("id")
      .inTable("players")
      .onDelete("CASCADE");

    table.string("position"); // e.g. "LW", "CB", "GK"
    table.boolean("starter").defaultTo(true); // false = sub

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lineup_players");
};
