const knex = require('knex')
const config = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "ecommerce",
    },
    pool: { min: 0, max: 7 },
}

const configSQLite3 = {
    client: "sqlite3",
    connection: { filename: './databaseSqlite/mydb.sqlite' },
    useNullAsDefault: true
}

const databaseConnection = knex(configSQLite3);
const databaseConectionMysql = knex(config);

module.exports = {
    databaseConnection,
    databaseConectionMysql
}