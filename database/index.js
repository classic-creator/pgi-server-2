// import { Sequelize } from 'sequelize';
// import config from '../config/config.js';

// const env = 'development';
// const { user, password, database, host,port, dialect, logging } = config[env];

// const sequelize = new Sequelize(database, user, password, {
//   host,
//   port,  
//   dialect,
//   logging,
// });

// export async function connectDB() {
//   try {
//     await sequelize.authenticate();
//     console.log('MySQL connection established successfully.');
//     await sequelize.sync();
//   } catch (error) {
//     console.error('Unable to connect to MySQL:', error);
//   }
// }

// export default sequelize;


// database/sequelize.js
import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const env = 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions,
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error);
  }
}

export default sequelize;
