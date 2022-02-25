/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("FIO").notNullable();
    table.string("email").notNullable();
    table.boolean("email_is_confirmed").notNullable().defaultTo(false);
    table.string("email_confirmation_code", 6);
    table.string("password");
    table.integer("phone").notNullable();
    table.enu("role", ["user", "admin"]).notNullable().defaultTo("user");
  });

  await knex.schema.createTable("photo_gallery", (table) => {
    table.increments("id");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("photos", (table) => {
    table.increments("id");
    table.integer("photo_gallery_id").notNullable();
    table.string("photo_path");
    table
      .foreign("photo_gallery_id")
      .references("photo_gallery.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("reviews", (table) => {
    table.increments("id");
    table.text("text").notNullable();
    table.integer("photo_gallery_id");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.integer("client_id").notNullable();
    table.boolean("published").notNullable().defaultTo(false);
    table
      .foreign("client_id")
      .references("users.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    table
      .foreign("photo_gallery_id")
      .references("photo_gallery.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("masters", (table) => {
    table.increments("id");
    table.string("FIO").notNullable();
    table.integer("photo_gallery_id").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.string("service_id").notNullable();
    table
      .foreign("photo_gallery_id")
      .references("photo_gallery.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("services", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.text("description");
    table.integer("price");
  });

  await knex.schema.createTable("services_masters", (table) => {
    table.increments("id");
    table.integer("master_id");
    table.integer("service_id");

    table
      .foreign("service_id")
      .references("services.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    table
      .foreign("master_id")
      .references("masters.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("record", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.integer("client_id").notNullable();
    table.date("data").notNullable();
    table.time("time", { precision: 6 }).notNullable().defaultTo(knex.fn.now());
    table.integer("service_id").notNullable();
    table.integer("master_id").notNullable();
    table.integer("price").notNullable();
    table
      .enu("status", ["recording", "recorded"])
      .notNullable()
      .defaultTo("recording");
    table
      .foreign("client_id")
      .references("users.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    table
      .foreign("service_id")
      .references("services.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    table
      .foreign("master_id")
      .references("masters.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};
// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("record");
  await knex.schema.dropTableIfExists("services_masters");
  await knex.schema.dropTableIfExists("services");
  await knex.schema.dropTableIfExists("masters");
  await knex.schema.dropTableIfExists("photos");
  await knex.schema.dropTableIfExists("reviews");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("photo_gallery");
};
