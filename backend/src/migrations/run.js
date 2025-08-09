const path = require('path');
const fs = require('fs');

async function runMigrations() {
  const migrationsDir = __dirname;
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => /^\d+_.*\.js$/.test(f))
    .sort();
  for (const file of files) {
    // eslint-disable-next-line global-require
    const migration = require(path.join(migrationsDir, file));
    if (typeof migration.up === 'function') {
      // run migration; we don't support down migrations here
      migration.up();
      // eslint-disable-next-line no-console
      console.log(`Applied migration: ${file}`);
    }
  }
}

runMigrations().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});