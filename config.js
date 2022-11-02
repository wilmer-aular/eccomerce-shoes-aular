import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  knex: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: `${__dirname}/DB/ecommerce.db3`
      }
    },
    useNullAsDefault: true,
    pool: { min: 2, max: 8 },
  },
  firebase: {
    apiKey: "AIzaSyAwCY4yLuDXErfaYPKX5cKWdjCTgg583Sg",
    authDomain: "coderhouse-ecommerce-aular.firebaseapp.com",
    projectId: "coderhouse-ecommerce-aular",
    storageBucket: "coderhouse-ecommerce-aular.appspot.com",
    messagingSenderId: "641076118044",
    appId: "1:641076118044:web:03d9a3aa92a75d68e995d9",
    measurementId: "G-90TYPHQH0R"
    // apiKey: "AIzaSyAwCY4yLuDXErfaYPKX5cKWdjCTgg583Sg",
    // authDomain: "coderhouse-ecommerce-aular.firebaseapp.com",
    // projectId: "coderhouse-ecommerce-aular",
    // storageBucket: "coderhouse-ecommerce-aular.appspot.com",
    // messagingSenderId: "641076118044",
    // appId: "1:641076118044:web:492dfedbc31fd2fee995d9",
    // measurementId: "G-P798BJQ5D0"
  }
};
