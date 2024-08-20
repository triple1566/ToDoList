const { password, connectionString } = require("pg/lib/defaults");
require("dotenv").config();
const Pool = require("pg").Pool;

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const proConfig = {
    connectionString: process.env.DATABASE_URL, //comes from heroku addons

    //line below fixes 503 error
    ssl: { rejectUnauthorized: false },
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;