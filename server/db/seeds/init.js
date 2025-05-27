const User = require("../../models/User");
const bcrypt = require("bcrypt");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Create password hashes
  const password = "123";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert 1 coach
  await knex("users").insert([
    {
      name: "Coach Garcia",
      email: "coach@statboost.com",
      password_hash: hashedPassword,
      role: "coach",
      created_at: new Date(),
    },
    {
      name: "Player One",
      email: "player1@statboost.com",
      password_hash: hashedPassword,
      role: "player",
      created_at: new Date(),
    },
    {
      name: "Player Two",
      email: "player2@statboost.com",
      password_hash: hashedPassword,
      role: "player",
      created_at: new Date(),
    },
    {
      name: "Player Three",
      email: "player3@statboost.com",
      password_hash: hashedPassword,
      role: "player",
      created_at: new Date(),
    },
    {
      name: "Player Four",
      email: "player4@statboost.com",
      password_hash: hashedPassword,
      role: "player",
      created_at: new Date(),
    },
  ]);
};
