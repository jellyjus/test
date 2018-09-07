const fs = require('fs');
const { Client } = require('pg');

const migrationsFolder = './db/migrations';

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = require(`../config_${process.env.NODE_ENV}.json`);

const client = new Client(config.db);

const migrations = fs.readdirSync(migrationsFolder);

migrations.sort((a, b) => +a.substr(0, a.indexOf('.')) > +b.substr(0, b.indexOf('.')));

async function startMigrate() {
  await client.connect();
  try {
    for (const migration of migrations) {
      console.log(`Applying ${migration}`);
      const query = fs.readFileSync(`${migrationsFolder}/${migration}`, 'utf8');
      await client.query(query);
      console.log(`${migration} successfully applied!`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  await client.end();
  console.log('Migrations complete!');
}

startMigrate();


