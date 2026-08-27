const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const seq = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false,
});

async function main() {
  await seq.authenticate();
  console.log("Connected to production Postgres");

  const userId = "15af4e29-9ede-40e7-b702-5a0d58c5bf30";

  // Create a test collection
  const [col] = await seq.query(
    `INSERT INTO "Collections" (id, "userId", name, description, "isSystem", "createdAt", "updatedAt")
     VALUES (gen_random_uuid(), ?, 'PG WS Test', 'Production Postgres test', false, NOW(), NOW())
     RETURNING id, name`,
    { replacements: [userId] }
  );
  const colId = col[0].id;
  console.log("Created collection:", colId, col[0].name);

  // Create items (using image type)
  for (let i = 0; i < 3; i++) {
    await seq.query(
      `INSERT INTO "CollectionItems" (id, "collectionId", "itemType", "itemId", "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), ?, 'image', gen_random_uuid(), NOW(), NOW())`,
      { replacements: [colId] }
    );
  }

  // Verify
  const [items] = await seq.query(
    `SELECT id, "itemType", "itemId" FROM "CollectionItems" WHERE "collectionId" = ?`,
    { replacements: [colId] }
  );
  console.log("Created", items.length, "items for collection", colId);
  console.log("COLLECTION_ID=" + colId);

  await seq.close();
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
