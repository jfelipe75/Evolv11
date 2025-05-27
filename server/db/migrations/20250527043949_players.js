/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("players", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");

    table.string("position", 20).notNullable();
    table.date("birth_date");
    table.string("profile_photo_url");

    // Core attributes for player card
    table.decimal("shooting", 5, 2).defaultTo(50.0);
    table.decimal("passing", 5, 2).defaultTo(50.0);
    table.decimal("dribbling", 5, 2).defaultTo(50.0);
    table.decimal("defense", 5, 2).defaultTo(50.0);
    table.decimal("physical", 5, 2).defaultTo(50.0);
    table.decimal("coach_grade", 5, 2).defaultTo(50.0);
    table.decimal("overall_rating", 5, 2).defaultTo(50.0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("players");
};
