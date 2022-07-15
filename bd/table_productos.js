const database = require('./bd');

const createTableProductos = async () => {
    try{
        await database.databaseConectionMysql.schema.createTable('producto', table => {
            table.increments('id').primary();
            table.string('title', 100).notNullable();
            table.string('price').notNullable();
            table.string('thumbnail', 200).notNullable();    
    });
    
        console.log('Tabla productos creada');
    }catch(e){
        console.log(e.message);
    }

}

module.exports = {
    createTableProductos
}