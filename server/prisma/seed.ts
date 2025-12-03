import { prisma } from "./prisma";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deleteAllData() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "TaskAssignment",
      "Comment",
      "Attachment",
      "Task",
      "ProjectTeam",
      "Project",
      "User",
      "Team"
    RESTART IDENTITY CASCADE;
  `);

  console.log("✓ All tables truncated and IDs reset");
}


async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Seed in order of dependencies (parents first, children last)
  const seedOrder = [
    "team.json",
    "user.json",
    "project.json",
    "projectTeam.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  console.log("🗑️  Deleting existing data...\n");
  await deleteAllData();

  console.log("\n🌱 Seeding database...\n");

  for (const fileName of seedOrder) {
    const filePath = path.join(dataDirectory, fileName);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠ File not found: ${fileName}`);
      continue;
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model: any = prisma[capitalizedModelName as keyof typeof prisma];

    if (!model || typeof model.create !== 'function') {
      console.error(`✗ Model ${capitalizedModelName} not found in Prisma Client`);
      continue;
    }

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`✓ Seeded ${capitalizedModelName} with ${jsonData.length} records from ${fileName}`);
    } catch (error: any) {
      console.error(`✗ Error seeding data for ${capitalizedModelName}:`, error.message);
      // Log the first record that failed for debugging
      if (jsonData.length > 0) {
        console.error(`  First record:`, JSON.stringify(jsonData[0], null, 2));
      }
    }
  }

  console.log("\n✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });