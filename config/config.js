// import dotenv from 'dotenv';
// dotenv.config();

// const config = {
//   const sslCert = fs.readFileSync(path.join(__dirname, '../../DigiCertGlobalRootCA.crt.pem'));
//   development: {
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || '',
//     database: process.env.DB_NAME || 'factorymanagementsystem1',
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//       connectTimeout: 10000,
//     },
//   },
// };

// export default config;
// config/config.js
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Read SSL Certificate for Azure MySQL
const sslCert = fs.readFileSync(path.join(__dirname, '../DigiCertGlobalRootCA.crt.pem'));

const config = {
  development: {
    username: process.env.DB_USER || 'pgiuser1',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'factorymanagementsystem1',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 30000 ,

      ssl: {
        ca: sslCert,
        // rejectUnauthorized: false,
      },
    },
  },
};

export default config;

