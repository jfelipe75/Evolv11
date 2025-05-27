/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("matches", function (table) {
    table.increments("id").primary();

    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");

    table.string("opponent_name").notNullable(); // e.g. "Riverside U17"
    table.date("match_date").notNullable(); // YYYY-MM-DD
    table.time("kickoff_time"); // Optional kickoff time
    table.string("location"); // Optional field/city
    table.string("competition"); // Optional (league, friendly, tournament)

    table.string("formation"); // e.g. "4-3-3", "3-5-2"
    table.integer("goals_for").defaultTo(0); // Your team’s goals
    table.integer("goals_against").defaultTo(0); // Opponent’s goals
    table.boolean("home_game").defaultTo(true); // True if home game

    table.text("match_notes"); // Optional for coach comments

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("matches");
};
