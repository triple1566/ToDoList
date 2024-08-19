const { password } = require("pg/lib/defaults");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "leopard1566",
    password: "kth18822",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;