import { Sequelize } from 'sequelize';

async function test(user, pass) {
  const s = new Sequelize('deckoviz', user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });
  try {
    await s.authenticate();
    console.log(`SUCCESS with user: ${user}, pass: ${pass}`);
    return true;
  } catch (e) {
    console.log(`FAILED with user: ${user}, pass: ${pass}`);
    return false;
  }
}

(async () => {
  if (await test('shashank', '')) return process.exit(0);
  if (await test('shashank', 'postgres')) return process.exit(0);
  if (await test('postgres', '')) return process.exit(0);
  if (await test('postgres', 'postgres')) return process.exit(0);
  if (await test('shashank', 'your_db_password')) return process.exit(0);
  if (await test('postgres', 'E4DOJ309#esf')) return process.exit(0);
  process.exit(1);
})();
