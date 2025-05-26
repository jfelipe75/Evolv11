/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("coaches", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 250).notNullable().unique();
    table.string("password_hash").notNullable(); // hashed password
    table.string("photo_url"); // This stores the Azure URL
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("coaches");
};
